import { Request, Response, NextFunction } from 'express';
import { Employee } from '@/models';

const readEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employees = await Employee.findAll();

    res.status(200).json({
      success: true,
      data: employees.map((emp) => emp.toJSON()),
      message: 'Employees fetched successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default readEmployees;
