import { Request, Response, NextFunction } from 'express';
import { Department } from '@/models';
import { isPositiveInteger } from '@/utils';
import { Op } from 'sequelize';
import { departmentSchema } from '@/schemas';

// Make all fields optional for partial updates
const departmentUpdateSchema = departmentSchema.partial();

const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const departmentId = parseInt(req.params.id, 10);

    if (!isPositiveInteger(departmentId)) {
      return res.status(401).json({
        message: 'Invalid department id',
      });
    }

    const parseResult = departmentUpdateSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: parseResult.error.issues[0].message,
      });
      return;
    }

    const updateData = parseResult.data;

    // Safely check if the new name belongs to a DIFFERENT department
    if (updateData.name) {
      const isNameTaken = await Department.findOne({
        where: {
          name: updateData.name,
          id: { [Op.ne]: departmentId }, // Ignore the current department's ID
        },
      });

      if (isNameTaken) {
        res.status(409).json({ message: 'The name already exists.' });
        return;
      }
    }

    const [affectedRows] = await Department.update(parseResult.data, {
      where: { id: departmentId },
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: 'Department not found.' });
      return;
    }

    const updatedDepartment = await Department.findByPk(departmentId);

    res.status(200).json({
      success: true,
      data: updatedDepartment?.toJSON(),
      message: 'Department updated successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default updateDepartment;
