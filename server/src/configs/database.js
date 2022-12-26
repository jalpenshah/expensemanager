import * as dotenv from 'dotenv';
import sequelize from 'sequelize';
import mysql2 from 'mysql2';

dotenv.config({
  path: process.env.ENVIRONMENT ? `.env.${process.env.ENVIRONMENT}` : `.env`,
});

const db = new sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    dialectModule: mysql2,
    host: process.env.DB_HOST,
    logging: true,
  }
);

export default db;
