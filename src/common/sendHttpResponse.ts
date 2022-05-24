import User, { IUserToResponse } from "../resources/users/user.model";
import { BoardClass } from "../resources/boards/board.model";
import HTTP_STATUS_CODES from '../constants/httpResponseStatusCodes';
import TaskClass from '../resources/tasks/task.model';
import { HTTP_RESPONCE } from "../types/httpTypes";

export type SuccessResultType = Record<string, string | number>
    | TaskClass
    | TaskClass[]
    | BoardClass
    | BoardClass[]
    | User[]
    | IUserToResponse
    | IUserToResponse[];

export type ErrorResponseResultType = Record<string, string | number>;
type ResultType = SuccessResultType | ErrorResponseResultType;

type SendHttpResponseType = (
    res: HTTP_RESPONCE,
    statusCode: HTTP_STATUS_CODES,
    result: ResultType,
) => void;

/**
 * Send HTTP response
 * @param res - HTTP response of class ServerResponse
 * @param statusCode - HTTP status code of response
 * @param result - data to send in response
 */
const sendHttpResponse: SendHttpResponseType = (res, statusCode, result) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
}

export default sendHttpResponse;
