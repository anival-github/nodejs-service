import { v4 as uuidv4 } from 'uuid';

interface IColumnToCreate {
  title: string;
  order: number;
}

class Column {
  id: string;

  title: string;

  order: number;

  /**
 * Return newly created column
 * @param column - object with column data
 * @returns new column
 */
  constructor({
    title = 'COLUMN',
    order = 0,
  }: IColumnToCreate) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
  }
}

export default Column;
