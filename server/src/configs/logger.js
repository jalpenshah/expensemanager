import { createLogger, format, transports } from "winston";

const handleErrorFormat = format((message) => {
  if (message instanceof Error) {
    Object.assign(message, { message: message.stack });
  }
  return message;
});

const commonOptions = {
  level: process.env.ENVIRONMENT === "development" ? "debug" : "info",
  format: format.combine(
    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    format.align(),
    handleErrorFormat(),
    process.env.ENVIRONMENT === "development"
      ? format.colorize()
      : format.uncolorize(),
    format.splat(),
    format.printf(
      (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
    )
  ),
};

const logger = createLogger({
  transports: [
    // new transports.File({
    //   filename:
    //     process.env.API_LOG_PATH ||
    //     "/Users/jss14/Documents/Jalpen/Personal/Codebase/jalpenshah.com/apps/expensetracker/logs/server.log",
    //   ...commonOptions,
    // }),
    new transports.Console({
      stderrLevels: ["error"],
      ...commonOptions,
    }),
  ],
});

export default logger;
