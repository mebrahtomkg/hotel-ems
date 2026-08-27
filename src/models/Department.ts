import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/db';
import type Employee from './Employee';

class Department extends Model<
  InferAttributes<Department>,
  InferCreationAttributes<Department>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string | null;

  declare employees?: Employee[];
}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'departments',
    timestamps: false,
    sequelize,
  },
);

export default Department;
