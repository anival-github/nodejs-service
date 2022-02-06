import * as winston from 'winston';

interface ILoggerLevels {
  [key: string]: number;
}

const loggerLevels: ILoggerLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  all: 4,
};

const maxLoggerLevelToShow = Object.keys(loggerLevels).find(
  (levelKey) => loggerLevels[levelKey] === Number(process.env.LOGGER_LEVEL),
);

export const loggerConfig = {
  levels: loggerLevels,
  level: maxLoggerLevelToShow || 'all',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: 'data/logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'data/logs/error.log',
      level: 'error',
      handleRejections: true,
      handleExceptions: true,
    }),
    new winston.transports.Console({
      level: 'error',
      handleRejections: true,
      handleExceptions: true,
    }),
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'data/logs/combined.log',
    }),
  ],
  exitOnError: true,
};
