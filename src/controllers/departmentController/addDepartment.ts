import { Request, Response, NextFunction } from 'express';
import { Department } from '@/models';
import { departmentSchema } from '@/schemas';

const addDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parseResult = departmentSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: parseResult.error.issues[0].message,
      });
      return;
    }

    const { name, description = null } = parseResult.data;

    if (await Department.findOne({ where: { name } })) {
      res.status(409).json({
        message: 'The name already exists.',
      });
      return;
    }

    const department = await Department.create({
      name,
      description,
    });

    res.status(201).json({
      success: true,
      data: department.toJSON(),
      message: 'department added successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default addDepartment;
