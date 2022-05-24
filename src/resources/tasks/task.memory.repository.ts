import { Equal, getRepository } from "typeorm";
import TaskClass, { TaskDtoType } from "../../entity/task.entity";

export class TasksRepo {
  /**
   * Get all tasks
   * @returns \{Promise\} Promise object represents collection of tasks
   */
  async getAll() {
    const repository = getRepository(TaskClass);
    const tasks = await repository.find();

    return tasks;
  }

  /**
   * Get all filtered tasks
   * @param filter - object with key to search and value to compare
   * @returns \{Promise\} Promise objects represents all tasks corresponding to the filter
   */
  async search({ key, value }: { key: keyof TaskClass, value: string }) {
    const repository = getRepository(TaskClass);
    const filteredCollection = repository.find({ [key]: Equal(value) });

    return filteredCollection;
  }

  /**
   * Get one task by id
   * @param id - task id string
   * @returns \{Promise\} Promise object represents task with a passed id
   */
  async getOne(id: string) {
    const repository = getRepository(TaskClass);
    const task = repository.findOne(id);

    return task;
  }

  /**
   * Create one task
   * @param newItem - object with task parameters;
   * @returns \{Promise\} Promise object represents newly create task
   */
  async createOne(newItem: TaskDtoType) {
    const repository = getRepository(TaskClass);
    const item = new TaskClass(newItem);

    await repository.save(item)

    return item;
  }

  /**
   * Delete task by id
   * @param id - task id string
   */
  async deleteOne(id: string) {
    const repository = getRepository(TaskClass);
    await repository.delete({ id });
  }

  /**
   * Delete all filtered tasks
   * @param filter - object with key to search and value to compare
   */
  async deleteMany({ key, value }: { key: keyof TaskClass, value: string }) {
    const repository = getRepository(TaskClass);
    await repository.delete({ [key]: Equal(value) });
  }

  /**
   * Update task by id
   * @param id - task id string
   * @param itemData - data to update a particular task
   * @returns \{Promise\} Promise object represents updated task
   */
  async updateOne(id: string, itemData: TaskClass) {
    const repository = getRepository(TaskClass);
    const taskToUpdate = repository.find({ id });

    const updatedTask = { ...taskToUpdate, ...itemData };
    await repository.save(updatedTask);

    return updatedTask;
  }

  /**
   * Update many tasks found using filter
   * @param filter - object with key to search and value to compare
   * @param updates - data to update each task
   */
  async updateMany({ key, value }: { key: keyof TaskClass, value: string }, updates: Partial<TaskClass>) {
    const repository = getRepository(TaskClass);
    const tasksToUpdate = await repository.find({ [key]: Equal(value) });

    const promises = tasksToUpdate.map((taskToUpdate: TaskClass) => {
      const updatedBoard = { ...taskToUpdate, ...updates };
      return repository.save(updatedBoard);
    })

    await Promise.all(promises);
  }
}

export default new TasksRepo();
