import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/db';
import type Employee from './Employee';

class Shift extends Model<
  InferAttributes<Shift>,
  InferCreationAttributes<Shift>
> {
  declare id: CreationOptional<number>;
  declare employeeId: number;
  declare startTime: number;
  declare endTime: number;
  declare notes: string | null;

  declare employee?: Employee;
}

Shift.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      get() {
        const value = this.getDataValue('startTime');
        return value === null ? null : Number.parseInt(`${value}`, 10);
      },
    },
    endTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      get() {
        const value = this.getDataValue('endTime');
        return value === null ? null : Number.parseInt(`${value}`, 10);
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'shifts',
    timestamps: false,
    sequelize,
  },
);

export default Shift;
