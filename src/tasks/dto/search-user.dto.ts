import { Task } from '../entities/task.entity';

export interface SearchTaskDto {
  key: keyof Task;
  value: string;
}
