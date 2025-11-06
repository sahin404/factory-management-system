import express from 'express';
import { balanceController } from './balance.controller';
import { verifyToken } from '../../middlewares/auth.middleware';

export const balanceRouter = express.Router();


balanceRouter.get('/', verifyToken, balanceController);