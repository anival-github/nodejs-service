import { BoardClass, BoardDtoType } from "../entity/board.entity";
import TaskClass, { TaskDtoType } from "../entity/task.entity";
import User, { UserDtoType } from "../entity/user.entity";
import { HTTP_REQUEST, HTTP_RESPONCE } from "./httpTypes";

export type RequestBodyDataType = UserDtoType | TaskDtoType | BoardDtoType;
export type GetBodyDataType = (req: HTTP_REQUEST, res: HTTP_RESPONCE) => Promise<RequestBodyDataType>;
export type ExtractIdType = (req: HTTP_REQUEST) => string;
export type SaveToLocalDatabaseType = (filePath: string, data: BoardClass[] | TaskClass[] | User[]) => void;
export type GetFromLocalDatabase = (filePath: string) => BoardClass[] | TaskClass[] | User[];