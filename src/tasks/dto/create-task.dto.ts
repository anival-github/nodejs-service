import { ITask } from '../interfaces/task.interface';

export type CreateTaskDto = Omit<ITask, 'id'>;
