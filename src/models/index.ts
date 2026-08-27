import Department from './Department';
import Role from './Role';
import Employee from './Employee';
import Shift from './Shift';
import Attendance from './Attendance';

export { Department, Role, Employee, Shift, Attendance };

// Employee <-> Department
Department.hasMany(Employee, { foreignKey: 'departmentId', as: 'employees' });
Employee.belongsTo(Department, {
  foreignKey: 'departmentId',
  as: 'department',
  onDelete: 'SET NULL',
});

// Employee <-> Role
Role.hasMany(Employee, { foreignKey: 'roleId', as: 'employees' });
Employee.belongsTo(Role, {
  foreignKey: 'roleId',
  as: 'role',
  onDelete: 'SET NULL',
});

// Employee <-> Shift
Employee.hasMany(Shift, { foreignKey: 'employeeId', as: 'shifts' });
Shift.belongsTo(Employee, {
  foreignKey: 'employeeId',
  as: 'employee',
  onDelete: 'CASCADE', // If employee is deleted, remove their shifts
});

// Employee <-> Attendance
Employee.hasMany(Attendance, { foreignKey: 'employeeId', as: 'attendances' });
Attendance.belongsTo(Employee, {
  foreignKey: 'employeeId',
  as: 'employee',
  onDelete: 'CASCADE', // If employee is deleted, remove their attendance records
});

// --- Scopes ---

// Scope to easily fetch an employee with their department and role
Employee.addScope('withDetails', {
  include: [
    {
      model: Department,
      as: 'department',
      required: false,
    },
    {
      model: Role,
      as: 'role',
      required: false,
    },
  ],
});
