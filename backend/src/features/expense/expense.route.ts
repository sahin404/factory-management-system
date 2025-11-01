import express from 'express';
import { addExpenseController, getExpenseController, updateExpenseController } from './expense.controller';


export const expenseRouter = express.Router();


expenseRouter.get('/', getExpenseController);
expenseRouter.post('/', addExpenseController);
expenseRouter.put('/:id', updateExpenseController);
// expenseRouter.delete('/', );
