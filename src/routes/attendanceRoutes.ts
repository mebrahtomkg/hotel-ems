import express from 'express';
import {
  addAttendance,
  readAttendances,
  updateAttendance,
  removeAttendance,
} from '@/controllers/attendanceController';

const router = express.Router();

router.post('/', addAttendance);
router.get('/', readAttendances);
router.put('/:id', updateAttendance);
router.delete('/:id', removeAttendance);

export default router;
