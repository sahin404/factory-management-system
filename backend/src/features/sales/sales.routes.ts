import express from 'express';
import { addSalesController } from './sales.controller';

const salesRouter = express.Router();


salesRouter.post('/add', addSalesController);


export default salesRouter;