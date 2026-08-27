import express from 'express';
import {
  addShift,
  readShifts,
  updateShift,
  removeShift,
} from '@/controllers/shiftController';

const router = express.Router();

router.post('/', addShift);
router.get('/', readShifts);
router.put('/:id', updateShift);
router.delete('/:id', removeShift);

export default router;
