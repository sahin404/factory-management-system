import express from 'express';
import { signUp } from './auth.controller';

export const authRouter = express.Router();


authRouter.post('/signup', signUp);