import taskMemoryRepository from "./task.memory.repository";
import TaskClass, { ITaskToCreate } from "./task.model";

class TaskService {
  getAll() {
    return taskMemoryRepository.getAll();
  }

  search({ key, value }: { key: keyof TaskClass, value: string }) {
    return taskMemoryRepository.search({ key, value });
  }

  getOne(id: string) {
    return taskMemoryRepository.getOne(id);
  }

  createOne(newItem: ITaskToCreate) {
    return taskMemoryRepository.createOne(newItem);
  }

  deleteOne(id: string) {
    return taskMemoryRepository.deleteOne(id);
  }

  updateOne(id: string, newItemData: TaskClass) {
    return taskMemoryRepository.updateOne(id, newItemData);
  }

  updateMany(filter: { key: keyof TaskClass, value: string }, updates: Partial<TaskClass>) {
    return taskMemoryRepository.updateMany(filter, updates);
  }

    getAllByBoardId(boardId: string): Promise<TaskClass[]> {
      return taskMemoryRepository.search({ key: 'boardId', value: boardId });
    }

    deleteAllByBoardId(boardId: string): Promise<void> {
      return taskMemoryRepository.deleteMany({ key: 'boardId', value: boardId });
    }
}

export default new TaskService();


// import BaseService from '../../common/base.service';
// import repo from './task.memory.repository';
// import TaskClass from './task.model';

// export class TaskServiceClass extends BaseService {
//   constructor() {
//     super(repo);
//   }

//   getAllByBoardId(boardId: string): Promise<TaskClass[]> {
//     return this.repo.search({ key: 'boardId', value: boardId });
//   }

//   deleteAllByBoardId(boardId: string): Promise<void> {
//     return this.repo.deleteMany({ key: 'boardId', value: boardId });
//   }
// }

// export interface ITaskService {
//   new () : TaskServiceClass;
//   getAllByBoardId(boardId: string): Promise<TaskClass[]>;
//   deleteAllByBoardId(boardId: string): Promise<void>;
// }

// export const TaskServiceInstance = new TaskServiceClass()

