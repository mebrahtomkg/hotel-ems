import { Request, Response, NextFunction } from 'express';
import { Attendance } from '@/models';
import { attendanceSchema } from '@/schemas';

const addAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parseResult = attendanceSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res
        .status(400)
        .json({ message: parseResult.error.issues[0].message });
    }

    const {
      employeeId,
      clockInTime,
      clockOutTime = null,
      status = 'PRESENT',
    } = parseResult.data;

    const attendance = await Attendance.create({
      employeeId,
      clockInTime,
      clockOutTime,
      status,
    });

    return res.status(201).json({
      success: true,
      data: attendance.toJSON(),
      message: 'Attendance recorded successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default addAttendance;
