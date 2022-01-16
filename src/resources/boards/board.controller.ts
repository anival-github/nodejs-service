import { validate } from 'uuid';
import { getBodyData, extractFirstId } from '../../utils/Utils';
import ErrorHandler from '../../common/errorHandler';
import SuccessHandler from '../../common/successHandler';
import BoardServiceInstance from './board.service';
import { getValidatedDataForBoard } from './board.validatior';
import TaskService from '../tasks/task.service';
import { BoardClass, BoardDtoType } from '../../entity/board.entity';
import { ControllerType } from '../../types/controllerTypes';

class BoardController {
  itemIdName = 'BoardId';

  itemName = 'Board';

  /**
   * Handle get all request
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  getAll: ControllerType = async (req, res) => {
    const collection = await BoardServiceInstance.getAll();

    SuccessHandler.OK(req, res, collection);
  }

  /**
   * Handle get one request
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  getOne: ControllerType = async (req, res) => {
    const id = extractFirstId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      ErrorHandler.badRequest(req, res, { message: `${this.itemIdName} is not valid` });
      return;
    }

    const item = await BoardServiceInstance.getOne(id);

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
  createOne: ControllerType = async (req, res) => {
    const body = await getBodyData(req, res) as BoardDtoType;
    const validationResult = getValidatedDataForBoard(body);

    if (!validationResult.valid || !validationResult.data) {
      ErrorHandler.badRequest(req, res, { message: validationResult.message }, body);
      return;
    }

    const validatedData = validationResult.data as BoardDtoType;
    const newItem = await BoardServiceInstance.createOne(validatedData);

    SuccessHandler.created(req, res, BoardClass.toResponse(newItem), body);
  }

  /**
   * Handle update one request
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  updateOne: ControllerType = async (req, res) => {
    const id = extractFirstId(req);
    const isIdValid = validate(id);
    const bodyData = await getBodyData(req, res) as BoardDtoType;

    if (!isIdValid) {
      ErrorHandler.badRequest(req, res, { message: `${this.itemIdName} is not valid` }, bodyData);
      return;
    }

    const updatedItem = await BoardServiceInstance.updateOne(id, bodyData);

    if (!updatedItem) {
      ErrorHandler.notFound(req, res, { message: `${this.itemName} not found` }, bodyData);
      return;
    }

    SuccessHandler.OK(req, res, updatedItem, bodyData);
  }

  /**
   * Handle delete one request
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  deleteOne: ControllerType = async (req, res) => {
    const id = extractFirstId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      ErrorHandler.badRequest(req, res, { message: `${this.itemIdName} is not valid` });
      return;
    }

    const item = await BoardServiceInstance.getOne(id);

    if (!item) {
      ErrorHandler.notFound(req, res, { message: `${this.itemName} not found` });
      return;
    }

    await BoardServiceInstance.deleteOne(id);

    TaskService.deleteAllByBoardId(id);

    SuccessHandler.noContent(req, res, { message: `The ${this.itemName} has been deleted` });
  }
}

export default new BoardController();
