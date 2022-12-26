import express from 'express';
import authController from './auth.controller';

const authRouter = express.Router();

authRouter.post('/continueWithGoogle', authController.continueWithGoogle);

export default authRouter;
