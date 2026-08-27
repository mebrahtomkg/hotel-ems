import { Request, Response, NextFunction } from 'express';
import { Shift } from '@/models';
import { isPositiveInteger } from '@/utils';

const removeShift = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shiftId = parseInt(req.params.id, 10);

    if (!isPositiveInteger(shiftId)) {
      res.status(401).json({
        message: 'Invalid shift id',
      });
      return;
    }

    const deletedRows = await Shift.destroy({
      where: { id: shiftId },
    });

    if (deletedRows === 0) {
      res.status(404).json({ message: 'Shift not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Shift removed successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default removeShift;
