// import { BoardClass } from './../resources/boards/board.model';
// import { BoardMemoryRepositoryClass } from "../resources/boards/board.memory.repository";
// import { TasksRepo } from "../resources/tasks/task.memory.repository";
// import TaskClass from "../resources/tasks/task.model";

// type MemoryRepositoryTypes = TasksRepo | BoardMemoryRepositoryClass;

// class BaseService {
//   repo: MemoryRepositoryTypes;

//   constructor(repo: MemoryRepositoryTypes) {
//     this.repo = repo;
//   }

//   getAll() {
//     return this.repo.getAll();
//   }

//   search({ key, value }: { key: string, value: string }) {
//     return this.repo.search({ key, value });
//   }

//   getOne(id: string) {
//     return this.repo.getOne(id);
//   }

//   createOne(newItem: TaskClass | BoardClass) {
//     return this.repo.createOne(newItem);
//   }

//   deleteOne(id: string) {
//     return this.repo.deleteOne(id);
//   }

//   updateOne(id: string, newItemData: TaskClass) {
//     return this.repo.updateOne(id, newItemData);
//   }

//   updateMany(filter: { key: string, value: string }, updates: Partial<TaskClass>) {
//     return this.repo.updateMany(filter, updates);
//   }
// }

// export default BaseService;
