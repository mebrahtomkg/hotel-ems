import { Request, Response, NextFunction } from 'express';
import { Attendance } from '@/models';

const readAttendances = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const attendances = await Attendance.findAll();

    return res.status(200).json({
      success: true,
      data: attendances.map((record) => record.toJSON()),
      message: 'Attendance records fetched successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default readAttendances;
