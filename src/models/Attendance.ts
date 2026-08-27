import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/db';
import type Employee from './Employee';

class Attendance extends Model<
  InferAttributes<Attendance>,
  InferCreationAttributes<Attendance>
> {
  declare id: CreationOptional<number>;
  declare employeeId: number;
  declare clockInTime: number;
  declare clockOutTime: number | null;
  declare status: CreationOptional<string>; // e.g., 'PRESENT', 'LATE', 'ABSENT'

  declare employee?: Employee;
}

Attendance.init(
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
    clockInTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      get() {
        const value = this.getDataValue('clockInTime');
        return value === null ? null : Number.parseInt(`${value}`, 10);
      },
    },
    clockOutTime: {
      type: DataTypes.BIGINT,
      allowNull: true,
      get() {
        const value = this.getDataValue('clockOutTime');
        return value === null ? null : Number.parseInt(`${value}`, 10);
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'PRESENT',
    },
  },
  {
    tableName: 'attendances',
    timestamps: false,
    sequelize,
  },
);

export default Attendance;
