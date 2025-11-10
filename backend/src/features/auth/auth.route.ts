import express from 'express';
import { signUpController, login, checkAuth } from './auth.controller';
import { verifyToken } from '../../middlewares/auth.middleware';

export const authRouter = express.Router();


authRouter.post('/signup', signUpController);
authRouter.post('/login', login);
authRouter.get('/me', verifyToken, checkAuth);