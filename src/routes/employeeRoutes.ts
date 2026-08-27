import express from 'express';
import {
  addEmployee,
  readEmployees,
  updateEmployee,
  removeEmployee,
} from '@/controllers/employeeController';

const router = express.Router();

router.post('/', addEmployee);
router.get('/', readEmployees);
router.put('/:id', updateEmployee);
router.delete('/:id', removeEmployee);

export default router;
