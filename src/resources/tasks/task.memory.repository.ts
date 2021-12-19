import TaskClass, { ITaskToCreate } from "./task.model";

let tasks: TaskClass[] = [];

export class TasksRepo {
  /**
 * Get all tasks
 * @returns \{Promise\} Promise object represents collection of tasks
 */
  async getAll() {
    return tasks;
  }

  /**
 * Get all filtered tasks
 * @param filter - object with key to search and value to compare
 * @returns \{Promise\} Promise objects represents all tasks corresponding to the filter
 */
  async search({ key, value }: { key: keyof TaskClass, value: string }) {
    const filteredCollection = tasks.filter((elem: TaskClass) => elem[key] === value);
    return filteredCollection;
  }

  /**
 * Get one task by id
 * @param id - task id string
 * @returns \{Promise\} Promise object represents task with a passed id
 */
  async getOne(id: string) {
    return tasks.find((elem) => elem.id === id);
  }

  /**
 * Create one task
 * @param newItem - object with task parameters;
 * @returns \{Promise\} Promise object represents newly create task
 */
  async createOne(newItem: ITaskToCreate) {
    const item = new TaskClass(newItem);

    tasks.push(item);
    return item;
  }

  /**
 * Delete task by id
 * @param id - task id string
 */
  async deleteOne(id: string) {
    tasks = tasks.filter((elem) => elem.id !== id);
  }

  /**
 * Delete all filtered tasks
 * @param filter - object with key to search and value to compare
 */
  async deleteMany({ key, value }: { key: keyof TaskClass, value: string }) {
    const filteredCollection = tasks.filter((elem) => elem[key] !== value);
    tasks = filteredCollection;
  }

  /**
 * Update task by id
 * @param id - task id string
 * @param itemData - data to update a particular task
 * @returns \{Promise\} Promise object represents updated task
 */
  async updateOne(id: string, itemData: TaskClass) {
    const itemIndex = tasks.findIndex((elem) => elem.id === id);

    tasks[itemIndex] = { ...tasks[itemIndex], ...itemData };

    return tasks[itemIndex];
  }

  /**
 * Update many tasks found using filter
 * @param filter - object with key to search and value to compare
 * @param updates - data to update each task
 */
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

