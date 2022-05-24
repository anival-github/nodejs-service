import Column from '../columns/column.model';
import { IBoardToCreate } from './board.model';

interface IValidationResult {
  valid: boolean;
  message: string;
  data: IBoardToCreate | null,
};

export type GetValidatedDataForBoardType = (body: IBoardToCreate) => IValidationResult;

/**
 * Validate board data from request
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 * @returns object represents board properties
 */
export const getValidatedDataForBoard: GetValidatedDataForBoardType = (body) => {
  const { title, columns } = body;

  if (!title || !columns || (columns && !columns.length)) {
    return {
      valid: false,
      message: 'Please, specify required fields: title, columns',
      data: null,
    };
  }

  const validatedColumns = [];

  for (let i = 0; i < columns.length; i += 1) {
    const column = columns[i];

    const { title: columnTitle, order } = column;

    if ([columnTitle, order].some((elem) => typeof elem === 'undefined')) {
      return {
        valid: false,
        message: 'Each column must contain title and order',
        data: null,
      };;
    }

    const validatedColumn = new Column({ title: columnTitle, order });
    validatedColumns.push(validatedColumn);
  }

  return {
    valid: true,
    message: '',
    data: {
      title,
      columns: validatedColumns,
    },
  };
};
