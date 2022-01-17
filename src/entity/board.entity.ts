import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryColumn, Column } from "typeorm";
import ColumnClass from './column.entity';

export interface IBoard {
  id: string;
  title: string;
  columns: ColumnClass[];
}

export type BoardDtoType = Omit<IBoard, 'id'>;

@Entity()
export class BoardClass implements IBoard {

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({ nullable: false, type: "simple-json", default: [] })
  columns: ColumnClass[];

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
    this.columns = columns;
  }
}

export default BoardClass;