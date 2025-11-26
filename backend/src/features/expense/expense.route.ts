import express from 'express';
import { addExpenseController, deleteExpenseController, getExpensesController } from './expense.controller';
import { verifyToken } from '../../middlewares/auth.middleware';
import { verifyAdmin } from '../../middlewares/adminVerify.middlware';
import { verifyAccountant } from '../../middlewares/accountantVerify.middleware';


export const expenseRouter = express.Router();

expenseRouter.post('/',verifyToken, verifyAdmin, verifyAccountant, addExpenseController);
expenseRouter.get('/',verifyToken, verifyAdmin, verifyAccountant, getExpensesController);
expenseRouter.delete('/:id',verifyToken, verifyAdmin, verifyAccountant, deleteExpenseController);
