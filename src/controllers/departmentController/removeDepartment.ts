import { Request, Response, NextFunction } from 'express';
import { Department } from '@/models';
import { isPositiveInteger } from '@/utils';

const removeDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const departmentId = parseInt(req.params.id, 10);

    if (!isPositiveInteger(departmentId)) {
      res.status(401).json({
        message: 'Invalid department id',
      });
      return;
    }

    const deletedRows = await Department.destroy({
      where: { id: departmentId },
    });

    if (deletedRows === 0) {
      res.status(404).json({ message: 'Department not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Department removed successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default removeDepartment;
