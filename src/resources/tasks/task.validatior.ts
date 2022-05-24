import { ITaskToCreate } from './task.model';
import errorHandlers from '../../common/errorHandler';
import { HTTP_REQUEST, HTTP_RESPONCE } from '../../types';
import { getBodyData, extractFirstId } from '../../utils/Utils';

interface validatedData {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

export type GetValidatedDataType = (req: HTTP_REQUEST, res: HTTP_RESPONCE) => Promise<validatedData | null>;

/**
 * Validate task data from request
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 * @returns object represents task properties
 */
export const getValidatedData: GetValidatedDataType = async (req, res) => {
  const body = await getBodyData(req, res) as ITaskToCreate;
  const boardIdFromUrl = extractFirstId(req);

  const {
    title,
    order,
    description,
    userId,
    boardId: boardIdFromBody,
    columnId = null,
  } = body;

  if ([title, order, description, userId, boardIdFromBody, columnId].some((elem) => elem === undefined)) {
    errorHandlers.badRequest(res, { message: 'Please, specify required fields: title, order, description, userId, boardId, columnId,' });
    return null;
  }

  return {
    title,
    order,
    description,
    userId,
    boardId: boardIdFromBody || boardIdFromUrl,
    columnId,
  };
};
