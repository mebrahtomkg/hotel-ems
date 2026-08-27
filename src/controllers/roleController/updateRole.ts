import { Request, Response, NextFunction } from 'express';
import { Role } from '@/models';
import { isPositiveInteger } from '@/utils';
import { Op } from 'sequelize';
import { roleSchema } from '@/schemas';

// Make all fields optional for partial updates
const roleUpdateSchema = roleSchema.partial();

const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = parseInt(req.params.id, 10);

    if (!isPositiveInteger(roleId)) {
      return res.status(401).json({
        message: 'Invalid role id',
      });
    }

    const parseResult = roleUpdateSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: parseResult.error.issues[0].message,
      });
      return;
    }

    const updateData = parseResult.data;

    // Safely check if the new name belongs to a DIFFERENT role
    if (updateData.name) {
      const isNameTaken = await Role.findOne({
        where: {
          name: updateData.name,
          id: { [Op.ne]: roleId }, // Ignore the current role's ID
        },
      });

      if (isNameTaken) {
        res.status(409).json({ message: 'The role name already exists.' });
        return;
      }
    }

    const [affectedRows] = await Role.update(parseResult.data, {
      where: { id: roleId },
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: 'Role not found.' });
      return;
    }

    const updatedRole = await Role.findByPk(roleId);

    res.status(200).json({
      success: true,
      data: updatedRole?.toJSON(),
      message: 'Role updated successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default updateRole;
