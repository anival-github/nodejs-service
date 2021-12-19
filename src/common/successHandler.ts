import { IUserToResponse } from './../resources/users/user.model';
import { BoardClass } from "../resources/boards/board.model";
import TaskClass from "../resources/tasks/task.model";
import User from "../resources/users/user.model";
import { HTTP_RESPONCE } from "../types";

export type DataType = Record<string, string | number>;
type HandlerFuncType = (res: HTTP_RESPONCE, data: TaskClass[] | BoardClass[] | BoardClass | TaskClass| User[]| IUserToResponse[] | IUserToResponse | DataType) => void;

export interface ISuccessHandler {
  OK: HandlerFuncType;
  created: HandlerFuncType;
  noContent: HandlerFuncType;
}

const SuccessHandler: ISuccessHandler = {
  OK: (res, data) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  },
  created: (res, data) => {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  },
  noContent: (res, data) => {
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  },
};

export default SuccessHandler;
