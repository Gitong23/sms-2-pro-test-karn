import express from 'express';
import { register, login } from '../controller/auth.controller';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);

export default authRouter;