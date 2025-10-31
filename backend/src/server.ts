import express from 'express';
import dotenv from 'dotenv';
import { dbConncet } from './config/db';
import { authRouter } from './features/auth/auth.route';
import employeeRouter from './features/employee/employee.route';
import { balanceRouter } from './features/balance/balance.route';
import { expenseRouter } from './features/expense/expense.route';

const app = express();
dotenv.config();
app.use(express.json());




app.use('/api/auth', authRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/balance', balanceRouter);
app.use('/api/expense', expenseRouter);



app.get('/', (req,res)=>{
    res.send('Hello World');
})

const port = process.env.PORT || 5000;
app.listen(port, async()=>{
    await dbConncet();
    console.log('Server running at port', port);
})