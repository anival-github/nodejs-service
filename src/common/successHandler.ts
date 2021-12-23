import { RequestBodyDataType } from "../utils/Utils";
import { HTTP_REQUEST, HTTP_RESPONCE } from "../types";
import HTTP_STATUS_CODES from "../constants/httpResponseStatusCodes";
import { logHttpRequest } from './logger';
import sendHttpResponse, { SuccessResultType } from "./sendHttpResponse";

type HandlerFuncType = (
  req: HTTP_REQUEST,
  res: HTTP_RESPONCE,
  result: SuccessResultType,
  body?: RequestBodyDataType | "",
) => void;

export interface ISuccessHandler {
  OK: HandlerFuncType;
  created: HandlerFuncType;
  noContent: HandlerFuncType;
}

const SuccessHandler: ISuccessHandler = {
/**
 * Send 200 status code response
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 * @param result - data to send in response
 * @param body - parsed body from request if any
 */
  OK: (req, res, result, body = "") => {
    const statusCode = HTTP_STATUS_CODES.OK;

    logHttpRequest(req, statusCode, body);
    sendHttpResponse(res, statusCode, result);
  },

/**
 * Send 201 status code response
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 * @param result - data to send in response
 * @param body - parsed body from request if any
 */
  created: (req, res, result, body = "") => {
    const statusCode = HTTP_STATUS_CODES.CREATED;

    logHttpRequest(req, statusCode, body);
    sendHttpResponse(res, statusCode, result);
  },

/**
 * Send 204 status code response
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 * @param result - data to send in response
 * @param body - parsed body from request if any
 */
  noContent: (req, res, result, body = "") => {
    const statusCode = HTTP_STATUS_CODES.NO_CONTENT;

    logHttpRequest(req, statusCode, body);
    sendHttpResponse(res, statusCode, result);
  },
};

export default SuccessHandler;
