import { Request, Response, NextFunction } from 'express';
import { Shift } from '@/models';
import { shiftSchema } from '@/schemas';

const addShift = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseResult = shiftSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: parseResult.error.issues[0].message,
      });
      return;
    }

    const { employeeId, startTime, endTime, notes = null } = parseResult.data;

    const shift = await Shift.create({
      employeeId,
      startTime,
      endTime,
      notes,
    });

    res.status(201).json({
      success: true,
      data: shift.toJSON(),
      message: 'shift added successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default addShift;
