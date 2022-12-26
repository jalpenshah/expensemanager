import express from 'express';
import categoriesController from './categories.controller';

const categoriesRouter = express.Router();

categoriesRouter.get('/list', categoriesController.getCategoriesForUser);
categoriesRouter.post('/save', categoriesController.saveCategory);

export default categoriesRouter;
