import expense from './expense.model';
import categoryService from '../categories/categories.service';
import userService from '../users/user.service';
import logger from '../../configs/logger';

import sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
const Op = sequelize.Op;

const create = async function (req, res) {
  try {
    const addCategory = req.body.add_category;

    if (req.body.date === undefined) {
      const date = new Date();
      req.body.date = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
    }
    const [day, month, year] = req.body?.date?.split('/');
    const date = new Date(year, month - 1, day);

    if (addCategory) {
      const categoryObj = {
        id: uuidv4(),
        user_id: req.payload.id,
        category: req.body.category,
      };
      try {
        await categoryService.addCategory(categoryObj);
      } catch (error) {
        logger.error(`Error saving category`, error);
      }
    }
    const expenseRes = await expense.create({
      id: uuidv4(),
      user_id: req.payload.id,
      paid_by: req.payload.email,
      type: req.body.type,
      category: req.body.category,
      title: req.body.title,
      amount: parseFloat(req.body.amount),
      desc: req.body.description,
      currency: 'GBP',
      date: date,
    });
    res.status(200).json({ data: expenseRes });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error });
  }
};

const getAll = async function (req, res) {
  try {
    res.status(200).json({ data: await expense.findAll() });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const getAllById = async function (req, res) {
  try {
    const userId = req.params.id;
    res.status(200).json({
      data: await expense.findAll({
        where: {
          user_id: userId,
        },
      }),
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const monthlyList = async function (req, res) {
  try {
    const userId = req.payload.id;
    const userObj = await userService.fetchUserById(userId);
    const usersIn = [];
    usersIn.push(userObj[0].id);
    if (userObj[0].partner_id && userObj[0].is_partner_verified === 1)
      usersIn.push(userObj[0].partner_id);
    const monthYear = req.params.monthYear;
    const year = monthYear.split('-')[0];
    const month = monthYear.split('-')[1];
    const data = await expense.findAll({
      where: {
        [Op.and]: [
          sequelize.where(sequelize.col('user_id'), { [Op.in]: usersIn }),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year),
          sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), month),
        ],
      },
      attributes: [
        'id',
        'paid_by',
        'type',
        'category',
        'title',
        'desc',
        'amount',
        'currency',
        'date',
      ],
    });
    res.status(200).json({ data: data });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error });
  }
};

const monthlyListById = async function (req, res) {
  try {
    const userId = req.payload.id;
    const userValue = req.params.id;
    const { id } = await userService.fetchPartnerEmail(userId);
    const generatedId = userValue === 'me' ? userId : id;
    const monthYear = req.params.monthYear;
    const year = monthYear.split('-')[0];
    const month = monthYear.split('-')[1];
    const data = await expense.findAll({
      where: {
        [Op.and]: [
          sequelize.where(sequelize.col('user_id'), generatedId),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year),
          sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), month),
        ],
      },
      attributes: [
        'id',
        'paid_by',
        'type',
        'category',
        'title',
        'desc',
        'amount',
        'currency',
        'date',
      ],
    });
    res.status(200).json({ data: data });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error });
  }
};

const removeExpense = async function (req, res) {
  try {
    const userId = req.payload.id;
    const expenseId = req.body.id;

    //remove expense row from database
    const count = await expense.destroy({
      where: { id: expenseId, user_id: userId },
    });

    res.status(200).json({
      status: 'SUCCESS',
      rowsDeleted: count,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const expenseController = {
  getAll,
  getAllById,
  create,
  monthlyList,
  monthlyListById,
  removeExpense,
};
export default expenseController;
