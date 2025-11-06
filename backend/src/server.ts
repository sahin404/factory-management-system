import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConncet } from './config/db';
import { authRouter } from './features/auth/auth.route';
import employeeRouter from './features/employee/employee.route';
import { balanceRouter } from './features/balance/balance.route';
import { expenseRouter } from './features/expense/expense.route';
import productRouter from './features/production/production.route';
import salesRouter from './features/sales/sales.route';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use('/api/auth', authRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/balance', balanceRouter);
app.use('/api/expense', expenseRouter);
app.use('/api/production', productRouter);
app.use('/api/selles', salesRouter);



app.get('/', (req,res)=>{
    res.send('Hello World');
})

const port = process.env.PORT || 5000;
app.listen(port, async()=>{
    await dbConncet();
    console.log('Server running at port', port);
})