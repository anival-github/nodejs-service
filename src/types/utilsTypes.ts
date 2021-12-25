import { IBoardToCreate } from "../resources/boards/board.model";
import { ITaskToCreate } from "../resources/tasks/task.model";
import { IUserToCreate } from "../resources/users/user.model";
import { HTTP_REQUEST, HTTP_RESPONCE } from "./httpTypes";

export type RequestBodyDataType = IUserToCreate | ITaskToCreate | IBoardToCreate;
export type GetBodyDataType = (req: HTTP_REQUEST, res: HTTP_RESPONCE) => Promise<RequestBodyDataType>;
export type ExtractIdType = (req: HTTP_REQUEST) => string;