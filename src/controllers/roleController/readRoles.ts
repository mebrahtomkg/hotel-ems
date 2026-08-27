import { Request, Response, NextFunction } from 'express';
import { Role } from '@/models';

const readRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await Role.findAll();

    res.status(200).json({
      success: true,
      data: roles.map((role) => role.toJSON()),
      message: 'Roles fetched successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default readRoles;
