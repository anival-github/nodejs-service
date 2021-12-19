import { v4 as uuidv4 } from 'uuid';

interface TaskShort {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
}

export interface ITaskToCreate {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

class TaskClass {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor({
    title = 'TASK',
    order = 0,
    description = 'DESCRIPTION',
    userId = null,
    boardId = null,
    columnId = null,
  }: ITaskToCreate) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(item: TaskClass): TaskShort {
    const {
      id, title, order, description, userId,
    } = item;

    return {
      id, title, order, description, userId,
    };
  }
}

export interface ITask {
  toResponse(item: TaskClass): TaskShort;

  new(itemData: ITaskToCreate): TaskClass;
}

export default TaskClass;
