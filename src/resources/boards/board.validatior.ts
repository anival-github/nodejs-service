import errorHandlers from '../../common/errorHandler';
import { HTTP_REQUEST, HTTP_RESPONCE } from '../../types';
import { getBodyData } from '../../utils/Utils';
import Column from '../columns/column.model';
import { IBoardToCreate } from './board.model';

export type GetValidatedDataForBoardType = (req: HTTP_REQUEST, res: HTTP_RESPONCE) => Promise<IBoardToCreate | null>;

/**
 * Validate board data from request
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 * @returns object represents board properties
 */
export const getValidatedDataForBoard: GetValidatedDataForBoardType = async (req, res) => {
  const body = await getBodyData(req, res) as IBoardToCreate;

  const {
    title,
    columns,
  } = body;

  if (!title || !columns || (columns && !columns.length)) {
    errorHandlers.badRequest(res, { message: 'Please, specify required fields: title, columns' });
    return null;
  }

  const validatedColumns = [];

  for (let i = 0; i < columns.length; i += 1) {
    const column = columns[i];

    const { title: columnTitle, order } = column;

    if ([columnTitle, order].some((elem) => typeof elem === 'undefined')) {
      errorHandlers.badRequest(res, { message: 'Each column must contain title and order' });
      return null;
    }

    const validatedColumn = new Column({ title: columnTitle, order });
    validatedColumns.push(validatedColumn);
  }

  return {
    title,
    columns: validatedColumns,
  };
};
