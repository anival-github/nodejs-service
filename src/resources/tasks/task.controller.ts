import { validate } from 'uuid';
import TaskServiceInstance from './task.service';
import { HTTP_REQUEST, HTTP_RESPONCE } from '../../types';
import { getBodyData, extractFirstId, extractSecondId } from '../../utils/Utils';
import ErrorHandler from '../../common/errorHandler';
import SuccessHandler from '../../common/successHandler';
import { getValidatedData } from './task.validatior';

class TaskController {
  itemIdName = 'TaskId';

  itemName = 'TaskClass';

  async getAll(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const collection = await TaskServiceInstance.getAll();

    return SuccessHandler.OK(res, collection);
  }

  async getOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const id = extractSecondId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      return ErrorHandler.badRequest(res, { message: `${this.itemIdName} is not valid` });
    }

    const item = await TaskServiceInstance.getOne(id);

    if (!item) {
      return ErrorHandler.notFound(res, { message: `${this.itemName} not found` });
    }

    return SuccessHandler.OK(res, item);
  }

  async createOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const validatedData = await getValidatedData(req, res);

    if (!validatedData) {
      return;
    }

    const newItem = await TaskServiceInstance.createOne(validatedData);

    SuccessHandler.created(res, newItem);
  }

  async updateOne (req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const id = extractSecondId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      return ErrorHandler.badRequest(res, { message: `${this.itemIdName} is not valid` });
    }

    const item = await TaskServiceInstance.getOne(id);

    if (!item) {
      return ErrorHandler.notFound(res, { message: `${this.itemName} not found` });
    }

    const bodyData = await getBodyData(req, res);

    const newDataForItem = {
      ...item,
      ...bodyData,
    };

    const updatedItem = await TaskServiceInstance.updateOne(id, newDataForItem);

    return SuccessHandler.OK(res, updatedItem);
  }

  public async deleteOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const id = extractSecondId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      return ErrorHandler.badRequest(res, { message: `${this.itemIdName} is not valid` });
    }

    const item = await TaskServiceInstance.getOne(id);

    if (!item) {
      return ErrorHandler.notFound(res, { message: `${this.itemName} not found` });
    }

    await TaskServiceInstance.deleteOne(id);
    return SuccessHandler.noContent(res, { message: `The ${this.itemName} has been deleted` });
  }

  async getAllByBoardId(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
      const boardId = extractFirstId(req);
      const isIdValid = validate(boardId);

      if (!isIdValid) {
        return ErrorHandler.badRequest(res, { message: 'BoardId is not valid' });
      }

      const items = await TaskServiceInstance.search({ key: 'boardId', value: boardId });

      if (!items || (items && !items.length)) {
        return ErrorHandler.notFound(res, { message: `${this.itemName}s not found` });
      }

      return SuccessHandler.OK(res, items);
  }
}

export default new TaskController();


// import { validate } from 'uuid';
// import BaseControllerClass from '../../common/base.controller';
// import { HTTP_REQUEST, HTTP_RESPONCE } from '../../types';
// import { extractSecondId, extractFirstId } from '../../utils/Utils';
// import { TaskServiceInstance } from './task.service';
// import { getValidatedData } from './task.validatior';

// class TaskController extends BaseControllerClass {
//   constructor() {
//     super({
//       Service: TaskServiceInstance,
//       itemIdName: 'TaskId',
//       itemName: 'TaskClass',
//       getValidatedData,
//       extractId: extractSecondId,
//     });
//   }

//   async getAllByBoardId(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
//     const boardId = extractFirstId(req);
//     const isIdValid = validate(boardId);

//     if (!isIdValid) {
//       return this.errorHandler.badRequest(res, { message: 'BoardId is not valid' });
//     }

//     const items = await this.Service.search({ key: 'boardId', value: boardId });

//     if (!items || (items && !items.length)) {
//       return this.errorHandler.notFound(res, { message: `${this.itemName}s not found` });
//     }

//     return this.successHandler.OK(res, items);
//   }
// }

// export const taskControllerInstance = new TaskController();


