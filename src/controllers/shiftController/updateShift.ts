import { Request, Response, NextFunction } from 'express';
import { Shift } from '@/models';
import { isPositiveInteger } from '@/utils';
import { shiftSchema } from '@/schemas';

// Make all fields optional for partial updates
const shiftUpdateSchema = shiftSchema.partial();

const updateShift = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shiftId = parseInt(req.params.id, 10);

    if (!isPositiveInteger(shiftId)) {
      res.status(401).json({
        message: 'Invalid shift id',
      });
      return;
    }

    const parseResult = shiftUpdateSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: parseResult.error.issues[0].message,
      });
      return;
    }

    const [affectedRows] = await Shift.update(parseResult.data, {
      where: { id: shiftId },
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: 'Shift not found.' });
      return;
    }

    const updatedShift = await Shift.findByPk(shiftId);

    res.status(200).json({
      success: true,
      data: updatedShift?.toJSON(),
      message: 'Shift updated successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default updateShift;
