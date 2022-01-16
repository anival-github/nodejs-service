import { HTTP_REQUEST, HTTP_RESPONCE } from "./httpTypes";

export type ControllerType = (req: HTTP_REQUEST, res: HTTP_RESPONCE) => Promise<void>;