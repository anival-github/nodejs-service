import { v4 as uuidv4 } from 'uuid';
import Column from '../columns/column.model';

export interface IBoardToCreate {
  title: string;
  columns: Column[];
}

export class BoardClass {
  id: string;

  title: string;

  columns: Column[];

  constructor({
    title = 'BOARD',
    columns = [],
  }: IBoardToCreate) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns;
  }
}

export interface IBoard {
  new ({
    id,
    title,
    columns,
  } : {
    id: string;
    title: string;
    columns: Column[];
  }): BoardClass;
}
