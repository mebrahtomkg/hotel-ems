import { Request, Response, NextFunction } from 'express';
import { Role } from '@/models';
import { isPositiveInteger } from '@/utils';

const removeRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = parseInt(req.params.id, 10);

    if (!isPositiveInteger(roleId)) {
      res.status(401).json({
        message: 'Invalid role id',
      });
      return;
    }

    const deletedRows = await Role.destroy({
      where: { id: roleId },
    });

    if (deletedRows === 0) {
      res.status(404).json({ message: 'Role not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Role removed successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default removeRole;
