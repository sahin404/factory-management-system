import express from 'express';
import {
  getAllEmployeeController,
  getSingleEmployeeController,
  deleteEmployeeController,
  updateEmployeeController,
} from './employee.controller';
import { verifyToken } from '../../middlewares/auth.middleware';
import { verifyAdmin } from '../../middlewares/adminVerify.middlware';
import { verifyManager } from '../../middlewares/managerVerify.middleware';

const router = express.Router();

router.get('/', verifyToken, verifyAdmin, verifyManager, getAllEmployeeController);
router.get('/:id', verifyToken, verifyAdmin, verifyManager, getSingleEmployeeController);
router.delete('/:id',verifyToken, verifyAdmin, verifyManager, deleteEmployeeController);
router.put('/:id',verifyToken, verifyAdmin, verifyManager, updateEmployeeController);

export default router;
