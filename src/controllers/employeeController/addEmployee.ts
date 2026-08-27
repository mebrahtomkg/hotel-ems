import { Request, Response, NextFunction } from 'express';
import { Department, Employee, Role } from '@/models';
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

    if (departmentId) {
      const dept = await Department.findByPk(departmentId);
      if (!dept) {
        res.status(404).json({
          message: `Department does not exist with id: ${departmentId}`,
        });
        return;
      }
    }

    if (roleId) {
      const role = await Role.findByPk(roleId);
      if (!role) {
        res.status(404).json({
          message: `Role does not exist with id: ${roleId}`,
        });
        return;
      }
    }

    const employee = await Employee.create({
      email,
      firstName,
      lastName,
      phone,
      departmentId,
      roleId,
    });

    const fullEmployeeData = await Employee.scope(['withDetails']).findByPk(
      employee.id,
    );

    res.status(201).json({
      success: true,
      data: fullEmployeeData?.toJSON(),
      message: 'employee added successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default addEmployee;
