import { BoardClass, IBoardToCreate } from "../resources/boards/board.model";
import TaskClass, { ITaskToCreate } from "../resources/tasks/task.model";
import User, { IUserToCreate } from "../resources/users/user.model";
import { HTTP_REQUEST, HTTP_RESPONCE } from "./httpTypes";

export type RequestBodyDataType = IUserToCreate | ITaskToCreate | IBoardToCreate;
export type GetBodyDataType = (req: HTTP_REQUEST, res: HTTP_RESPONCE) => Promise<RequestBodyDataType>;
export type ExtractIdType = (req: HTTP_REQUEST) => string;
export type SaveToLocalDatabaseType = (filePath: string, data: BoardClass[] | TaskClass[] | User[]) => void;
export type GetFromLocalDatabase = (filePath: string) => BoardClass[] | TaskClass[] | User[];