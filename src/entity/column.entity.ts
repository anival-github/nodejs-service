import { v4 as uuidv4 } from 'uuid';

export interface IColumn {
  id: string;
  title: string;
  order: number;
};

type ColumnDtoType = Omit<IColumn, 'id'>;

class ColumnClass implements IColumn {
  id: string;

  title: string;

  order: number;

  /**
   * Return newly created column
   * @param column - object with column data
   * @returns new column
   */
  constructor({
    title,
    order,
  }: ColumnDtoType = {
    title: 'COLUMN',
    order: 0,
  }) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
  }
}

export default ColumnClass;
