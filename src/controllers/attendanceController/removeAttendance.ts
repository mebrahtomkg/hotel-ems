import { Request, Response, NextFunction } from 'express';
import { Attendance } from '@/models';
import { isPositiveInteger } from '@/utils';

const removeAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const attendanceId = parseInt(req.params.id, 10);

    if (!isPositiveInteger(attendanceId)) {
      return res.status(401).json({ message: 'Invalid attendance id' });
    }

    const deletedRows = await Attendance.destroy({
      where: { id: attendanceId },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Attendance not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Attendance removed successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default removeAttendance;
