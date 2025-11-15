import express from 'express';
import { addExpenseController, deleteExpenseController } from './expense.controller';


export const expenseRouter = express.Router();

expenseRouter.post('/', addExpenseController);
expenseRouter.delete('/:id', deleteExpenseController);
