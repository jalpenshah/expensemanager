import express from 'express';
import expenseController from './expense.controller';

const expenseRouter = express.Router();

expenseRouter.get('/list', expenseController.getAll);
expenseRouter.get('/list/:id', expenseController.getAllById);
expenseRouter.post('/create', expenseController.create);
expenseRouter.get('/monthly/:monthYear', expenseController.monthlyList);
expenseRouter.get('/monthly/:monthYear/:id', expenseController.monthlyListById);
expenseRouter.post('/remove', expenseController.removeExpense);

export default expenseRouter;
