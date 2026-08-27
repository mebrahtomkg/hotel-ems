import { Request, Response, NextFunction } from 'express';
import { Employee } from '@/models';
import { isPositiveInteger } from '@/utils';
import { Op } from 'sequelize';
import { employeeSchema } from '@/schemas';

// Make all fields optional for partial updates
const employeeUpdateSchema = employeeSchema.partial();

const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employeeId = parseInt(req.params.id, 10);

    if (!isPositiveInteger(employeeId)) {
      return res.status(401).json({
        message: 'Invalid employee id',
      });
    }

    const parseResult = employeeUpdateSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: parseResult.error.issues[0].message,
      });
      return;
    }

    const updateData = parseResult.data;

    // Safely check if the new email belongs to a DIFFERENT employee
    if (updateData.email) {
      const isEmailTaken = await Employee.findOne({
        where: {
          email: updateData.email,
          id: { [Op.ne]: employeeId }, // Ignore the current employee's ID
        },
      });

      if (isEmailTaken) {
        res.status(409).json({ message: 'The email already exists.' });
        return;
      }
    }

    const [affectedRows] = await Employee.update(parseResult.data, {
      where: { id: employeeId },
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: 'Employee not found.' });
      return;
    }

    const updatedEmployee = await Employee.scope(['withDetails']).findByPk(
      employeeId,
    );

    res.status(200).json({
      success: true,
      data: updatedEmployee?.toJSON(),
      message: 'Employee updated successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default updateEmployee;
