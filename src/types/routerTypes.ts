import { HTTP_REQUEST, HTTP_RESPONCE } from "./httpTypes";

export type RouterType = (req: HTTP_REQUEST, res: HTTP_RESPONCE) => void;