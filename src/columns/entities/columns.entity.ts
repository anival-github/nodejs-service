import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { CreateColumnDto } from '../dto/create-column.dto';
import { IColumns } from '../interfaces/columns.interface';

export class Columns implements IColumns {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  order: number;

  /**
   * Return newly created column
   * @param column - object with column data
   * @returns new column
   */
  constructor(
    { title, order }: CreateColumnDto = {
      title: 'COLUMN',
      order: 0,
    }
  ) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
  }
}
