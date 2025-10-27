import express from 'express';
import {
  getAllEmployeeController,
  getSingleEmployeeController,
  deleteEmployeeController,
  updateEmployeeByEmployeeController,
  updateEmployeeByAdminController,
} from './employee.controller';

const router = express.Router();

router.get('/', getAllEmployeeController);
router.get('/:id', getSingleEmployeeController);
router.delete('/:id', deleteEmployeeController);
router.patch('/update-by-employee/:id', updateEmployeeByEmployeeController);
router.patch('/update-by-admin/:id', updateEmployeeByAdminController);

export default router;
