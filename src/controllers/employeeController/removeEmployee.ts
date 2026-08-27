import { Request, Response, NextFunction } from 'express';
import { Employee } from '@/models';
import { isPositiveInteger } from '@/utils';

const removeEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employeeId = parseInt(req.params.id, 10);

    if (!isPositiveInteger(employeeId)) {
      res.status(401).json({
        message: 'Invalid employee id',
      });
      return;
    }

    const deletedRows = await Employee.destroy({
      where: { id: employeeId },
    });

    if (deletedRows === 0) {
      res.status(404).json({ message: 'Employee not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Employee removed successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default removeEmployee;
