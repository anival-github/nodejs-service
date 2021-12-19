import TaskClass, { ITaskToCreate } from "./task.model";

let tasks: TaskClass[] = [];

export class TasksRepo {
  async getAll() {
    return tasks;
  }

  async search({ key, value }: { key: keyof TaskClass, value: string }) {
    const filteredCollection = tasks.filter((elem: TaskClass) => elem[key] === value);
    return filteredCollection;
  }

  async getOne(id: string) {
    return tasks.find((elem) => elem.id === id);
  }

  async createOne(newItem: ITaskToCreate) {
    const item = new TaskClass(newItem);

    tasks.push(item);
    return item;
  }

  async deleteOne(id: string) {
    tasks = tasks.filter((elem) => elem.id !== id);
  }

  async deleteMany({ key, value }: { key: keyof TaskClass, value: string }) {
    const filteredCollection = tasks.filter((elem) => elem[key] !== value);
    tasks = filteredCollection;
  }

  async updateOne(id: string, itemData: TaskClass) {
    const itemIndex = tasks.findIndex((elem) => elem.id === id);

    tasks[itemIndex] = { ...tasks[itemIndex], ...itemData };

    return tasks[itemIndex];
  }

  async updateMany(filter: { key: keyof TaskClass, value: string }, updates: Partial<TaskClass>) {
    const filteredItems = tasks.filter((elem: TaskClass) => elem[filter.key] === filter.value);
    const filteredItemsIndexes = filteredItems.map((elem) => tasks.findIndex((collectionItem) => collectionItem.id === elem.id));

    for (let i = 0; i < filteredItemsIndexes.length; i += 1) {
      const index = filteredItemsIndexes[i];

      const newCollectionItem = {
        ...tasks[index],
        ...updates,
      } as TaskClass;

      tasks[index] = newCollectionItem;
    }
  }
}

export default new TasksRepo();


// import BaseMemoryRepository from '../../common/base.memory.repository';
// import TaskClass from './task.model';

// export class TaskMemoryRepositoryClass extends BaseMemoryRepository {
//   constructor() {
//     super(TaskClass);
//   }
// }

// export default new TaskMemoryRepositoryClass();

