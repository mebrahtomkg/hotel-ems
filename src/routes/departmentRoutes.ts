import express from 'express';
import {
  addDepartment,
  readDepartments,
  updateDepartment,
  removeDepartment,
} from '@/controllers/departmentController';

const router = express.Router();

router.post('/', addDepartment);
router.get('/', readDepartments);
router.put('/:id', updateDepartment);
router.delete('/:id', removeDepartment);

export default router;
