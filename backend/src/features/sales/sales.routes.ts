import express from 'express';
import { addSalesController, deleteSalesController, getAllSalesController } from './sales.controller';

const salesRouter = express.Router();


salesRouter.get('/', getAllSalesController);
salesRouter.post('/add', addSalesController);
salesRouter.delete('/:id', deleteSalesController);


export default salesRouter;