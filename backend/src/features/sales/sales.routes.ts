import express from 'express';
import { addSalesController, deleteSalesController, getAllSalesController } from './sales.controller';
import { verifyManager } from '../../middlewares/managerVerify.middleware';
import { verifyAdmin } from '../../middlewares/adminVerify.middlware';
import { verifyToken } from '../../middlewares/auth.middleware';

const salesRouter = express.Router();


salesRouter.get('/',  verifyToken, verifyAdmin, verifyManager, getAllSalesController);
salesRouter.post('/add', verifyToken, verifyAdmin, verifyManager, addSalesController);
salesRouter.delete('/:id', verifyToken, verifyAdmin, verifyManager, deleteSalesController);


export default salesRouter;