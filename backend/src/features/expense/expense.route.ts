import express from 'express';
import { addExpenseController, deleteExpenseController, getExpensesController } from './expense.controller';


export const expenseRouter = express.Router();

expenseRouter.post('/', addExpenseController);
expenseRouter.get('/', getExpensesController);
expenseRouter.delete('/:id', deleteExpenseController);
