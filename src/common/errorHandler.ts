import { RequestBodyDataType } from "../utils/Utils";
import HTTP_STATUS_CODES from "../constants/httpResponseStatusCodes";
import { HTTP_REQUEST, HTTP_RESPONCE } from "../types";
import { logHttpRequest } from './logger';
import sendHttpResponse, { ErrorResponseResultType } from "./sendHttpResponse";

type HandlerFuncType = (
  req: HTTP_REQUEST,
  res: HTTP_RESPONCE,
  result: ErrorResponseResultType,
  body?: RequestBodyDataType | "",
) => void;

export interface IErrorHandler {
  badRequest: HandlerFuncType;
  notFound: HandlerFuncType;
  internalServerError: HandlerFuncType;
}

const ErrorHandler: IErrorHandler = {
/**
 * Send 400 status code response
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 * @param result - data to send in response
 * @param body - parsed body from request if any
 */
  badRequest: (req, res, result, body = "") => {
    const statusCode = HTTP_STATUS_CODES.BAD_REQUEST;

    logHttpRequest(req, statusCode, body);
    sendHttpResponse(res, statusCode, result);
  },

/**
 * Send 404 status code response
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 * @param result - data to send in response
 * @param body - parsed body from request if any
 */
  notFound: (req, res, result, body = "") => {
    const statusCode = HTTP_STATUS_CODES.NOT_FOUND;

    logHttpRequest(req, statusCode, body);
    sendHttpResponse(res, statusCode, result);
  },

/**
 * Send 500 status code response
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 * @param result - data to send in response
 * @param body - parsed body from request if any
 */
  internalServerError: (req, res, result, body = "") => {
    const statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;

    logHttpRequest(req, statusCode, body);
    sendHttpResponse(res, statusCode, result);
  },
};

export default ErrorHandler;
