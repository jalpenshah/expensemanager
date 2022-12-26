import * as dotenv from 'dotenv';
import logger from './src/configs/logger';
dotenv.config({
  path: process.env.ENVIRONMENT ? `.env.${process.env.ENVIRONMENT}` : `.env`,
});
import app from './src/app';
import db from './src/configs/database';

const start = async () => {
  // db.sync();
  app.listen(process.env.API_PORT || 4004, () => {
    logger.info(
      `Expense manager API is running at port ${process.env.API_PORT}`
    );
  });
};

/*
// Error handling
const unexpectedErrorHandler = (error) => {
  logger.error(error);
  if (server) {
    server.close(() => {
      logger.info("Stopping server because of unknown critical error!");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", unexpectedErrorHandler);
process.on("SIGINT", unexpectedErrorHandler);

*/
start();
