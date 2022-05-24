import { SuccessResultType } from "../common/sendHttpResponse";
import { HTTP_REQUEST, HTTP_RESPONCE } from "./httpTypes";
import { RequestBodyDataType } from "./utilsTypes";

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
