import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/db';
import type Department from './Department';
import type Role from './Role';
import type Shift from './Shift';
import type Attendance from './Attendance';

class Employee extends Model<
  InferAttributes<Employee>,
  InferCreationAttributes<Employee>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phone: string | null;
  declare departmentId: number | null;
  declare roleId: number | null;
  declare hireDate: CreationOptional<number>;

  declare department?: Department;
  declare role?: Role;
  declare shifts?: Shift[];
  declare attendances?: Attendance[];
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hireDate: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Date.now(),
      get() {
        const value = this.getDataValue('hireDate');
        return value === null ? null : Number.parseInt(`${value}`, 10);
      },
    },
  },
  {
    tableName: 'employees',
    timestamps: false,
    sequelize,
  },
);

export default Employee;
