import { validate } from 'uuid';
import { HTTP_REQUEST, HTTP_RESPONCE } from '../../types';
import { getBodyData, extractFirstId } from '../../utils/Utils';
import ErrorHandler from '../../common/errorHandler';
import SuccessHandler from '../../common/successHandler';
import BoardServiceInstance from './board.service';
import { getValidatedDataForBoard } from './board.validatior';
import TaskService from '../tasks/task.service';

class BoardController {
  itemIdName = 'BoardId';

  itemName = 'Board';

  /**
 * Handle get all request
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 */
  async getAll(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const collection = await BoardServiceInstance.getAll();

    SuccessHandler.OK(res, collection);
  }

  /**
 * Handle get one request
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 */
  async getOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const id = extractFirstId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      ErrorHandler.badRequest(res, { message: `${this.itemIdName} is not valid` });
      return;
    }

    const item = await BoardServiceInstance.getOne(id);

    if (!item) {
      ErrorHandler.notFound(res, { message: `${this.itemName} not found` });
      return;
    }

    SuccessHandler.OK(res, item);
  }

  /**
 * Handle create one request
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 */
  async createOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const validatedData = await getValidatedDataForBoard(req, res);

    if (!validatedData) {
      return;
    }

    const newItem = await BoardServiceInstance.createOne(validatedData);

    SuccessHandler.created(res, newItem);
  }

  /**
 * Handle update one request
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 */
  async updateOne (req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const id = extractFirstId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      ErrorHandler.badRequest(res, { message: `${this.itemIdName} is not valid` });
      return;
    }

    const item = await BoardServiceInstance.getOne(id);

    if (!item) {
      ErrorHandler.notFound(res, { message: `${this.itemName} not found` });
      return;
    }

    const bodyData = await getBodyData(req, res);

    const newDataForItem = {
      ...item,
      ...bodyData,
    };

    const updatedItem = await BoardServiceInstance.updateOne(id, newDataForItem);

    SuccessHandler.OK(res, updatedItem);
  }

  /**
 * Handle delete one request
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 */
  public async deleteOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const id = extractFirstId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      ErrorHandler.badRequest(res, { message: `${this.itemIdName} is not valid` });
      return;
    }

    const item = await BoardServiceInstance.getOne(id);

    if (!item) {
      ErrorHandler.notFound(res, { message: `${this.itemName} not found` });
      return;
    }

    await BoardServiceInstance.deleteOne(id);

    TaskService.deleteAllByBoardId(id);

    SuccessHandler.noContent(res, { message: `The ${this.itemName} has been deleted` });
  }
}

export default new BoardController();
