import { IColumns } from '../interfaces/columns.interface';

export type CreateColumnDto = Omit<IColumns, 'id'>;
