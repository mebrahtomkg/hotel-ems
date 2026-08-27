import { Request, Response, NextFunction } from 'express';
import { Employee } from '@/models';
import { employeeSchema } from '@/schemas';

const addEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseResult = employeeSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: parseResult.error.issues[0].message,
      });
      return;
    }

    const {
      email,
      firstName,
      lastName,
      phone,
      departmentId = null,
      roleId = null,
    } = parseResult.data;

    if (await Employee.findOne({ where: { email } })) {
      res.status(409).json({
        message: 'The email already exists.',
      });
      return;
    }

    const employee = await Employee.create({
      email,
      firstName,
      lastName,
      phone,
      departmentId,
      roleId,
    });

    res.status(201).json({
      success: true,
      data: employee.toJSON(),
      message: 'employee added successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default addEmployee;
