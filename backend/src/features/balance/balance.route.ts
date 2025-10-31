import express from 'express';
import { balanceController } from './balance.controller';

export const balanceRouter = express.Router();


balanceRouter.get('/', balanceController);