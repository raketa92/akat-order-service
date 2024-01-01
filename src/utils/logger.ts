import winston from "winston";
import dailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, json, colorize } = winston.format;

const timezone = () =>
  new Date().toLocaleString("ru-RU", {
    timeZone: "Asia/Ashgabat",
  });

  const transportError = new dailyRotateFile({
    filename: "./logs/error-%DATE%.log",
    level: "error",
    zippedArchive: true,
    datePattern: "yyyy-MM-DD",
  });

  const transportCombined = new dailyRotateFile({
    filename: "./logs/combined-%DATE%.log",
    datePattern: "yyyy-MM-DD",
    zippedArchive: true,
  });

  const logger = winston.createLogger({
    level: "info",
    format: combine(timestamp({ format: timezone }), json(), colorize()),
    defaultMeta: { service: "payment-service" },
    transports: [transportError, transportCombined],
  });

  export default logger;