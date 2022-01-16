import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

interface ITask {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;
}

type TaskToResponseType = Omit<ITask, 'boardId' | 'columnId'>;
export type TaskDtoType = Omit<ITask, 'id'>;

@Entity()
class TaskClass implements ITask {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @Column({
    type: String,
    nullable: true,
  })
  userId: string | null;

  @Column({
    type: String,
    nullable: true,
  })
  boardId: string | null;

  @Column({
    type: String,
    nullable: true,
  })
  columnId: string | null;

  /**
   * Return newly created task
   * @param task - object with task data
   * @returns new task
   */
  constructor({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }: TaskDtoType = {
      title: 'TASK',
      order: 0,
      description: 'DESCRIPTION',
      userId: null,
      boardId: null,
      columnId: null,
    }) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Return user withot secret field
   * @param item - object with all task params
   * @returns object represents task without secret field
   */
  static toResponse(item: TaskClass): TaskToResponseType {
    const {
      id, title, order, description, userId,
    } = item;

    return {
      id, title, order, description, userId,
    };
  }
}

export default TaskClass;
