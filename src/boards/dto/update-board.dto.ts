import { BaseBoard } from '../base-board';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBoardDto extends PartialType(BaseBoard) {}
