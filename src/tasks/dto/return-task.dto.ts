import { ITask } from '../interfaces/task.interface';

export type ReturnTaskDto = Omit<ITask, 'boardId' | 'columnId'>;
