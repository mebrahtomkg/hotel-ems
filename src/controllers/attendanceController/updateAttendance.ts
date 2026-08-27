import { Request, Response, NextFunction } from 'express';
import { Attendance } from '@/models';
import { isPositiveInteger } from '@/utils';
import { attendanceSchema } from '@/schemas';

const attendanceUpdateSchema = attendanceSchema.partial();

const updateAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const attendanceId = parseInt(req.params.id, 10);

    if (!isPositiveInteger(attendanceId)) {
      return res.status(401).json({ message: 'Invalid attendance id' });
    }

    const parseResult = attendanceUpdateSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res
        .status(400)
        .json({ message: parseResult.error.issues[0].message });
    }

    const [affectedRows] = await Attendance.update(parseResult.data, {
      where: { id: attendanceId },
    });

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Attendance record not found.' });
    }

    const updatedAttendance = await Attendance.findByPk(attendanceId);

    return res.status(200).json({
      success: true,
      data: updatedAttendance?.toJSON(),
      message: 'Attendance updated successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default updateAttendance;
