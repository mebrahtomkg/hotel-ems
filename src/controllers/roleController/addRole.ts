import { Request, Response, NextFunction } from 'express';
import { Role } from '@/models';
import { roleSchema } from '@/schemas';

const addRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseResult = roleSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: parseResult.error.issues[0].message,
      });
      return;
    }

    const { name, description = null, hourlyRate = null } = parseResult.data;

    if (await Role.findOne({ where: { name } })) {
      res.status(409).json({
        message: 'The role name already exists.',
      });
      return;
    }

    const role = await Role.create({
      name,
      description,
      hourlyRate,
    });

    res.status(201).json({
      success: true,
      data: role.toJSON(),
      message: 'role added successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default addRole;
