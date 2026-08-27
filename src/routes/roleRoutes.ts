import express from 'express';
import {
  addRole,
  readRoles,
  updateRole,
  removeRole,
} from '@/controllers/roleController';

const router = express.Router();

router.post('/', addRole);
router.get('/', readRoles);
router.put('/:id', updateRole);
router.delete('/:id', removeRole);

export default router;
