import { ITaskToCreate } from './task.model';

interface IValidationResult {
  valid: boolean,
  message: string,
  data: ITaskToCreate | null,
}

export type GetValidatedDataType = (
  body: ITaskToCreate,
  boardIdFromUrl: string,
) => IValidationResult;

/**
 * Validate task data from request
 * @param body - parsed body from HTTP request
 * @param boardIdFromUrl - parsed board id from HTTP request
 * @returns object represents validation results
 */
export const getValidatedData: GetValidatedDataType = (body, boardIdFromUrl) => {
  const {
    title,
    order,
    description,
    userId,
    boardId: boardIdFromBody,
    columnId = null,
  } = body;

  if ([title, order, description, userId, boardIdFromBody, columnId].some((elem) => elem === undefined)) {
    return {
      valid: false,
      message: 'Please, specify required fields: title, order, description, userId, boardId, columnId.',
      data: null,
    };
  }

  return {
    valid: true,
    message: '',
    data: {
      title,
      order,
      description,
      userId,
      boardId: boardIdFromBody || boardIdFromUrl,
      columnId,
    },
  };
};
