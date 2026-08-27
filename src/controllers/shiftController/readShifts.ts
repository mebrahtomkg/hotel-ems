import { Request, Response, NextFunction } from 'express';
import { Shift } from '@/models';

const readShifts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shifts = await Shift.findAll();

    res.status(200).json({
      success: true,
      data: shifts.map((shift) => shift.toJSON()),
      message: 'Shifts fetched successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default readShifts;
