import User, { IUserToResponse } from "../resources/users/user.model";
import { BoardClass } from "../resources/boards/board.model";
import TaskClass from "../resources/tasks/task.model";
import { HTTP_RESPONCE } from "../types";

export type DataType = Record<string, string | number>;
type HandlerFuncType = (res: HTTP_RESPONCE, data: TaskClass[] | BoardClass[] | BoardClass | TaskClass| User[]| IUserToResponse[] | IUserToResponse | DataType) => void;

export interface ISuccessHandler {
  OK: HandlerFuncType;
  created: HandlerFuncType;
  noContent: HandlerFuncType;
}

const SuccessHandler: ISuccessHandler = {
  /**
 * Send 200 status code response
 * @param res - http response class ServerResponse
 * @param data - data to send in response
 */
  OK: (res, data) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  },
  /**
 * Send 201 status code response
 * @param res - http response class ServerResponse
 * @param data - data to send in response
 */
  created: (res, data) => {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  },
   /**
 * Send 204 status code response
 * @param res - http response class ServerResponse
 * @param data - data to send in response
 */
  noContent: (res, data) => {
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  },
};

export default SuccessHandler;
