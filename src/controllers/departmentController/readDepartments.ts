import { Request, Response, NextFunction } from 'express';
import { Department } from '@/models';

const readDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const departments = await Department.findAll();

    res.status(200).json({
      success: true,
      data: departments.map((dept) => dept.toJSON()),
      message: 'Departments fetched successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default readDepartments;
