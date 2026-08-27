import { NextFunction, Request, Response } from 'express';
import { Employee, Attendance, Role, Department } from '@/models';
import { fn, literal, col } from 'sequelize';

export const payrollReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const report = await Employee.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        // Calculate total hours worked: (clockOut - clockIn) / 3,600,000 milliseconds
        [
          fn(
            'ROUND',
            fn(
              'SUM',
              literal(
                '(`attendances`.`clockOutTime` - `attendances`.`clockInTime`) / 3600000',
              ),
            ),
            2,
          ),
          'totalHoursWorked',
        ],
        // Count how many times the status was 'LATE'
        [
          fn(
            'SUM',
            literal(
              "CASE WHEN `attendances`.`status` = 'LATE' THEN 1 ELSE 0 END",
            ),
          ),
          'totalLateIncidents',
        ],
      ],
      include: [
        {
          model: Attendance,
          as: 'attendances',
          attributes: [], // Omit raw attendance rows, we only want the aggregated math
          required: true,
        },
        {
          model: Role,
          as: 'role',
          attributes: ['name', 'hourlyRate'],
        },
        {
          model: Department,
          as: 'department',
          attributes: ['name'],
        },
      ],
      group: ['Employee.id', 'role.id', 'department.id'], // Group by employee and their relations[cite: 4]
      raw: true, // Returns standard JSON format
      nest: true, // Preserves nested object structure for Role and Department
    });

    // Calculate total payout in JavaScript before sending the response
    const finalizedReport = report.map((row: any) => ({
      employeeName: `${row.firstName} ${row.lastName}`,
      department: row.department.name,
      role: row.role.name,
      hourlyRate: row.role.hourlyRate,
      hoursWorked: row.totalHoursWorked,
      lateIncidents: row.totalLateIncidents,
      // Multiply hours by the rate
      estimatedPayout: (
        parseFloat(row.totalHoursWorked) * parseFloat(row.role.hourlyRate)
      ).toFixed(2),
    }));

    res.status(200).json({ success: true, data: finalizedReport });
  } catch (error) {
    next(error);
  }
};

export default payrollReport;
