import { PrimaryColumn, Column, ManyToOne, Entity } from 'typeorm';
import { ReturnTaskDto } from '../dto/return-task.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from '../dto/create-task.dto';
import { ITask } from '../interfaces/task.interface';

@Entity()
export class Task implements ITask {
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

  @ManyToOne('Board', 'tasks', { onDelete: 'CASCADE' })
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
  constructor(
    { title, order, description, userId, boardId, columnId }: CreateTaskDto = {
      title: 'TASK',
      order: 0,
      description: 'DESCRIPTION',
      userId: null,
      boardId: null,
      columnId: null,
    },
  ) {
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
  static toResponse(item: Task): ReturnTaskDto {
    const { id, title, order, description, userId } = item;

    return {
      id,
      title,
      order,
      description,
      userId,
    };
  }
}
