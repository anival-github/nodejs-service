import User, { UserToResponseType } from "../entity/user.entity";
import { BoardClass } from "../entity/board.entity";
import HTTP_STATUS_CODES from '../constants/httpResponseStatusCodes';
import TaskClass from '../entity/task.entity';
import { HTTP_RESPONCE } from "../types/httpTypes";

export type SuccessResultType = Record<string, string | number>
    | TaskClass
    | TaskClass[]
    | BoardClass
    | BoardClass[]
    | User[]
    | UserToResponseType
    | UserToResponseType[];

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
