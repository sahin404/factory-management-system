import express from 'express';
import {
  getAllEmployeeController,
  getSingleEmployeeController,
  deleteEmployeeController,
  updateEmployeeController,
} from './employee.controller';

const router = express.Router();

router.get('/', getAllEmployeeController);
router.get('/:id', getSingleEmployeeController);
router.delete('/:id', deleteEmployeeController);
router.put('/:id', updateEmployeeController);

export default router;
