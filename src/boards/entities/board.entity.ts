import { v4 as uuidv4 } from 'uuid';
import { Columns } from 'src/columns/entities/columns.entity';
import { Entity, PrimaryColumn, Column } from 'typeorm';
import { CreateBoardDto } from '../dto/create-board.dto';
import { BaseBoard } from '../base-board';

@Entity()
export class Board implements BaseBoard {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({ nullable: false, type: 'simple-json', default: [] })
  columns: Columns[];

  /**
   * Return newly created board
   * @param board - object with board data
   * @returns new board
   */
  constructor(
    { title, columns }: CreateBoardDto = {
      title: 'BOARD',
      columns: [],
    }
  ) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns;
  }
}
