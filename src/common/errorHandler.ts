import { HTTP_RESPONCE } from "../types";

type DataType = Record<string, string | number>;
type HandlerFuncType = (res: HTTP_RESPONCE, data: DataType) => void;

export interface IErrorHandler {
  badRequest: HandlerFuncType;
  notFound: HandlerFuncType;
  internalServerError: HandlerFuncType;
}

const ErrorHandler: IErrorHandler = {
  /**
 * Send 400 status code response
 * @param res - http response class ServerResponse
 * @param data - data to send in response
 */
  badRequest: (res, data) => {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  },
  /**
 * Send 404 status code response
 * @param res - http response class ServerResponse
 * @param data - data to send in response
 */
  notFound: (res, data) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  },
  /**
 * Send 500 status code response
 * @param res - http response class ServerResponse
 * @param data - data to send in response
 */
  internalServerError: (res, data) => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  },
};

export default ErrorHandler;
