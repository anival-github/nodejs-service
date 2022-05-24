import winston from 'winston';
import { HTTP_REQUEST } from "../types/httpTypes";
import config from "./config";
import HTTP_STATUS_CODES from '../constants/httpResponseStatusCodes';
import { RequestBodyDataType } from '../types/utilsTypes';

interface ILoggerLevels {
  [key: string]: number;
}

const loggerLevels: ILoggerLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  all: 4
};

const maxLoggerLevelToShow = Object.keys(loggerLevels).find((levelKey) => (
  loggerLevels[levelKey] === Number(config.LOGGER_LEVEL)
));

const logger = winston.createLogger({
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
      handleExceptions: true
    }),
    new winston.transports.File({
      filename: 'data/logs/combined.log',
    }),
  ],
  exitOnError:	false,
});

let isLogLevelInfoLogged = false;

if (!isLogLevelInfoLogged) {
  logger.info(`Logger level is set to ${config.LOGGER_LEVEL}, max logging level is "${maxLoggerLevelToShow}"`, { source: 'logger.ts'})
  isLogLevelInfoLogged = true;
}

type LogHttpRequestType = (
  req: HTTP_REQUEST,
  statusCode: HTTP_STATUS_CODES,
  body: RequestBodyDataType | "",
) => void;

/**
 * Log HTTP requsts
 * @param req - http request class IncomingMessage
 * @param statusCode - HTTP status code of response
 * @param body - parsed body from request if any
 */
export const logHttpRequest: LogHttpRequestType = (req, statusCode, body) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);

  logger.info('HTTP request log', {
    "url": url.href,
    "method": req.method,
    "query parameters": url.searchParams,
    "body": body,
    "status code": statusCode,
  });
};

export default logger;
