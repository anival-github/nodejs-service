import { Board } from '../entities/board.entity';

export interface SearchBoardDto {
  key: keyof Board;
  value: string;
}
