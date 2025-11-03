import express from 'express';
import { signUp, login, checkAuth } from './auth.controller';
import { verifyToken } from '../../middlewares/auth.middleware';

export const authRouter = express.Router();


authRouter.post('/signup', signUp);
authRouter.post('/login', login);
authRouter.get('/me', verifyToken, checkAuth);