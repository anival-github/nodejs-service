import { BaseBoard } from '../base-board';
import { OmitType } from '@nestjs/mapped-types';

export class CreateBoardDto extends OmitType(BaseBoard, ['id'] as const) {}
