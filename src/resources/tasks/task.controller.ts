import { validate } from 'uuid';
import { TaskDtoType } from '../../entity/task.entity';
import TaskServiceInstance from './task.service';
import { HTTP_REQUEST, HTTP_RESPONCE } from '../../types/httpTypes';
import { getBodyData, extractFirstId, extractSecondId } from '../../utils/Utils';
import ErrorHandler from '../../common/errorHandler';
import SuccessHandler from '../../common/successHandler';
import { getValidatedData } from './task.validatior';

class TaskController {
  itemIdName = 'TaskId';

  itemName = 'TaskClass';

  /**
   * Handle get all request
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  async getAll(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const collection = await TaskServiceInstance.getAll();

    SuccessHandler.OK(req, res, collection);
  }

  /**
   * Handle get one request
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  async getOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const id = extractSecondId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      ErrorHandler.badRequest(req, res, { message: `${this.itemIdName} is not valid` });
      return;
    }

    const item = await TaskServiceInstance.getOne(id);

    if (!item) {
      ErrorHandler.notFound(req, res, { message: `${this.itemName} not found` });
      return;
    }

    SuccessHandler.OK(req, res, item);
  }

  /**
   * Handle create one request
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  async createOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const body = await getBodyData(req, res) as TaskDtoType;

    const boardIdFromUrl = extractFirstId(req);
    const validationResult = getValidatedData(body, boardIdFromUrl);

    if (!validationResult.valid || !validationResult.data) {
      ErrorHandler.badRequest(req, res, { message: validationResult.message }, body);
      return;
    }

    const validatedData = validationResult.data as TaskDtoType;
    const newItem = await TaskServiceInstance.createOne(validatedData);

    SuccessHandler.created(req, res, newItem);
  }

  /**
   * Handle update one request
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  async updateOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const id = extractSecondId(req);
    const isIdValid = validate(id);
    const bodyData = await getBodyData(req, res);

    if (!isIdValid) {
      ErrorHandler.badRequest(req, res, { message: `${this.itemIdName} is not valid` }, bodyData);
      return;
    }

    const item = await TaskServiceInstance.getOne(id);

    if (!item) {
      ErrorHandler.notFound(req, res, { message: `${this.itemName} not found` }, bodyData);
      return;
    }

    const newDataForItem = { ...item, ...bodyData };
    const updatedItem = await TaskServiceInstance.updateOne(id, newDataForItem);

    SuccessHandler.OK(req, res, updatedItem, bodyData);
  }

  /**
   * Handle delete one request
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  public async deleteOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const id = extractSecondId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      ErrorHandler.badRequest(req, res, { message: `${this.itemIdName} is not valid` });
      return;
    }

    const item = await TaskServiceInstance.getOne(id);

    if (!item) {
      ErrorHandler.notFound(req, res, { message: `${this.itemName} not found` });
      return;
    }

    await TaskServiceInstance.deleteOne(id);
    SuccessHandler.noContent(req, res, { message: `The ${this.itemName} has been deleted` });
  }

  /**
   * Get all tasks by board id
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  async getAllByBoardId(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const boardId = extractFirstId(req);
    const isIdValid = validate(boardId);

    if (!isIdValid) {
      ErrorHandler.badRequest(req, res, { message: 'BoardId is not valid' });
      return;
    }

    const items = await TaskServiceInstance.search({ key: 'boardId', value: boardId });

    if (!items || (items && !items.length)) {
      ErrorHandler.notFound(req, res, { message: `${this.itemName}s not found` });
      return;
    }

    SuccessHandler.OK(req, res, items);
  }
}

export default new TaskController();
