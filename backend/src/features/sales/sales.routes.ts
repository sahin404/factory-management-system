import express from 'express';
import { addSalesController, getAllSalesController } from './sales.controller';

const salesRouter = express.Router();


salesRouter.get('/', getAllSalesController);
salesRouter.post('/add', addSalesController);


export default salesRouter;