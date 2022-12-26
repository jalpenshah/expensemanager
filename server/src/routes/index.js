import express from 'express';
import { verifyToken } from '../middlewares/authTokenHelper';
import limiter from '../middlewares/rate-limiter';
import { verifyGoogleToken } from '../middlewares/authTokenHelper';

import userRouter from '../features/users/user.routes';
import expenseRouter from '../features/expenses/expense.routes';
import splitRouter from '../features/split/split.routes';
import friendsRouter from '../features/friends/friends.routes';
import uploadRouter from '../features/upload/upload.routes';
import authRouter from '../features/auth/auth.routes';
import categoriesRouter from '../features/categories/categories.routes';

const routes = express.Router();
routes.use('/auth', limiter.rateLimiter, verifyGoogleToken, authRouter);
routes.use('/users', verifyToken, userRouter);
routes.use('/expenses', verifyToken, expenseRouter);
routes.use('/friends', friendsRouter);
routes.use('/split', splitRouter);
routes.use('/upload', uploadRouter);
routes.use('/categories', verifyToken, categoriesRouter);
routes.use('/verify', userRouter);

export default routes;
