import { Employee } from '@/models';
import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Hit database to check database health too.
    await Employee.findByPk(1);

    res
      .status(200)
      .send('Hotel Employee Management System backend is running.');
  } catch (err) {
    next(err);
  }
});

export default router;
