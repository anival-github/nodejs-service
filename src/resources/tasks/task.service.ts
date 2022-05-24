import taskMemoryRepository from "./task.memory.repository";
import TaskClass, { ITaskToCreate } from "./task.model";

class TaskService {
  /**
   * Get all tasks
   * @returns \{Promise\} Promise object represents collection of tasks
   */
  getAll() {
    return taskMemoryRepository.getAll();
  }

  /**
   * Get all filtered tasks
   * @param filter - object with key to search and value to compare
   * @returns \{Promise\} Promise objects represents all tasks corresponding to the filter
   */
  search({ key, value }: { key: keyof TaskClass, value: string }) {
    return taskMemoryRepository.search({ key, value });
  }

  /**
   * Get one task by id
   * @param id - task id string
   * @returns \{Promise\} Promise object represents task with a passed id
   */
  getOne(id: string) {
    return taskMemoryRepository.getOne(id);
  }

  /**
   * Create one task
   * @param newItem - object with task parameters;
   * @returns \{Promise\} Promise object represents newly create task
   */
  createOne(newItem: ITaskToCreate) {
    return taskMemoryRepository.createOne(newItem);
  }

  /**
   * Delete task by id
   * @param id - task id string
   */
  deleteOne(id: string) {
    return taskMemoryRepository.deleteOne(id);
  }

  /**
   * Update task by id
   * @param id - task id string
   * @param itemData - data to update a particular task
   * @returns \{Promise\} Promise object represents updated task
   */
  updateOne(id: string, newItemData: TaskClass) {
    return taskMemoryRepository.updateOne(id, newItemData);
  }

  /**
   * Update many tasks found using filter
   * @param filter - object with key to search and value to compare
   * @param updates - data to update each task
   */
  updateMany(filter: { key: keyof TaskClass, value: string }, updates: Partial<TaskClass>) {
    return taskMemoryRepository.updateMany(filter, updates);
  }

  /**
   * Delete all filtered tasks
   * @param boardId - board id of corresponding task string
   * @returns \{Promise\} Promise objects represents all tasks corresponding to the boardId
   */
  getAllByBoardId(boardId: string): Promise<TaskClass[]> {
    return taskMemoryRepository.search({ key: 'boardId', value: boardId });
  }

  /**
   * Delete all filtered tasks
   * @param boardId - board id of corresponding task string
   */
  deleteAllByBoardId(boardId: string) {
    taskMemoryRepository.deleteMany({ key: 'boardId', value: boardId });
  }
}

export default new TaskService();
