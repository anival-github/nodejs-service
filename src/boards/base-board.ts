import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { Columns } from 'src/columns/entities/columns.entity';

export class BaseBoard {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  columns: Columns[];
}
