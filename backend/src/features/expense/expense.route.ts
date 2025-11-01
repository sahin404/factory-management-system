import express from 'express';
import { getExpenseController } from './expense.controller';


export const expenseRouter = express.Router();


expenseRouter.get('/', getExpenseController);
// expenseRouter.patch('/', );
// expenseRouter.delete('/', );
// expenseRouter.post('/', );