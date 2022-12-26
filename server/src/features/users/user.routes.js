import express from 'express';
import userController from './user.controller';

const userRouter = express.Router();

userRouter.post('/partner/:ref', userController.verifyPartner);

userRouter.get('/createUser', userController.createUser);
userRouter.get('/fetchPartnerId', userController.fetchPartnerEmail);
userRouter.post('/setup', userController.saveSetup);

userRouter.get('/:emailId', userController.fetchUserByEmail);
export default userRouter;
