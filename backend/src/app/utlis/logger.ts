import winston from "winston";
import morgan from "morgan";
import path from "path";

// Создание логгера с winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.resolve(__dirname, "..", "logs", "error.log"),
      level: "error",
    }),
    new winston.transports.File({ filename: path.resolve(__dirname, "..", "logs", "error.log") }),
  ],
});

// Настройка morgan для использования winston
const morganMiddleware = morgan("combined", {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});

export { logger, morganMiddleware };
