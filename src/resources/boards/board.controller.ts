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

  async getAll(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const collection = await BoardServiceInstance.getAll();

    return SuccessHandler.OK(res, collection);
  }

  async getOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const id = extractFirstId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      return ErrorHandler.badRequest(res, { message: `${this.itemIdName} is not valid` });
    }

    const item = await BoardServiceInstance.getOne(id);

    if (!item) {
      return ErrorHandler.notFound(res, { message: `${this.itemName} not found` });
    }

    return SuccessHandler.OK(res, item);
  }

  async createOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const validatedData = await getValidatedDataForBoard(req, res);

    if (!validatedData) {
      return;
    }

    const newItem = await BoardServiceInstance.createOne(validatedData);

    return SuccessHandler.created(res, newItem);
  }

  async updateOne (req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const id = extractFirstId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      return ErrorHandler.badRequest(res, { message: `${this.itemIdName} is not valid` });
    }

    const item = await BoardServiceInstance.getOne(id);

    if (!item) {
      return ErrorHandler.notFound(res, { message: `${this.itemName} not found` });
    }

    const bodyData = await getBodyData(req, res);

    const newDataForItem = {
      ...item,
      ...bodyData,
    };

    const updatedItem = await BoardServiceInstance.updateOne(id, newDataForItem);

    return SuccessHandler.OK(res, updatedItem);
  }

  public async deleteOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const id = extractFirstId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      return ErrorHandler.badRequest(res, { message: `${this.itemIdName} is not valid` });
    }

    const item = await BoardServiceInstance.getOne(id);

    if (!item) {
      return ErrorHandler.notFound(res, { message: `${this.itemName} not found` });
    }

    await BoardServiceInstance.deleteOne(id);

    TaskService.deleteAllByBoardId(id);

    return SuccessHandler.noContent(res, { message: `The ${this.itemName} has been deleted` });
  }
}

export default new BoardController();

// import BaseControllerClass from '../../common/base.controller';
// import { BoardServiceInstance } from './board.service';
// import { TaskServiceInstance, TaskServiceClass } from '../tasks/task.service';
// import { getValidatedDataForBoard } from './board.validatior';
// import { HTTP_REQUEST, HTTP_RESPONCE } from '../../types';

// class BoardControllerClass extends BaseControllerClass {
//   tasksService: TaskServiceClass;

//   constructor() {
//     super({
//       Service: BoardServiceInstance,
//       itemIdName: 'BoardId',
//       itemName: 'Board',
//       getValidatedData: getValidatedDataForBoard,
//     });

//     this.tasksService = TaskServiceInstance;

//     const superClassDeleteOne = this.deleteOne;

//     this.deleteOne = async function deleteOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
//       superClassDeleteOne.call(this, req, res);

//       const id = this.extractId(req);

//       this.tasksService.deleteAllByBoardId(id);
//     };
//   }
// }

// export const boardControllerInstance = new BoardControllerClass();
