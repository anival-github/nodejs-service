import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryColumn, Column } from "typeorm";
import ColumnClass from './column.entity';

export interface IBoard {
  id: string;
  title: string;
  columns: string;
}

export type BoardDtoType = {
  title: string;
  columns: ColumnClass[];
};

export interface BoardClassToResponse {
  id: string;
  title: string;
  columns: ColumnClass[];
}
@Entity()
export class BoardClass implements IBoard {

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  columns: string;

  /**
   * Return newly created board
   * @param board - object with board data
   * @returns new board
   */
  constructor({
    title,
    columns,
  }: BoardDtoType = {
    title: 'BOARD',
    columns: [],
  }) {
    this.id = uuidv4();
    this.title = title;
    this.columns = JSON.stringify(columns);
  }

  static toResponse(item: BoardClass): BoardClassToResponse {
    const {
      id, title, columns,
    } = item;

    return {
      id,
      title,
      columns: JSON.parse(columns),
    };
  }
}

export default BoardClass;