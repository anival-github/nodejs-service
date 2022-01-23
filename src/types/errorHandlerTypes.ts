import { ErrorResponseResultType } from "../common/sendHttpResponse";
import { HTTP_REQUEST, HTTP_RESPONCE } from "./httpTypes";
import { RequestBodyDataType } from "./utilsTypes";

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
    unauthorized: HandlerFuncType;
    forbidden: HandlerFuncType;
}
