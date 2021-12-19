// import { validate } from 'uuid';
// import { TaskServiceClass } from '../resources/tasks/task.service';
// import { GetValidatedDataType } from '../resources/tasks/task.validatior';
// import { HTTP_REQUEST, HTTP_RESPONCE } from '../types';
// import { getBodyData, extractFirstId, ExtractFirstIdType } from '../utils/Utils';
// import ErrorHandler, { IErrorHandler } from './errorHandler';
// import SuccessHandler, { ISuccessHandler } from './successHandler';
// import { BoardServiceClass } from '../resources/boards/board.service';
// import { GetValidatedDataForBoardType } from '../resources/boards/board.validatior';

// class BaseControllerClass {
//   extractId: ExtractFirstIdType;

//   itemName: string;

//   itemIdName: string;

//   errorHandler: IErrorHandler;

//   successHandler: ISuccessHandler;

//   Service: TaskServiceClass | BoardServiceClass;

//   getValidatedData: GetValidatedDataType | GetValidatedDataForBoardType;

//   constructor({
//     Service,
//     itemIdName,
//     itemName,
//     getValidatedData,
//     extractId = extractFirstId,
//   }: {
//     Service: TaskServiceClass | BoardServiceClass,
//     itemName: string;
//     itemIdName: string;
//     extractId?: ExtractFirstIdType;
//     getValidatedData: GetValidatedDataType | GetValidatedDataForBoardType;
//   }) {
//     this.Service = Service;
//     this.successHandler = SuccessHandler;
//     this.errorHandler = ErrorHandler;
//     this.itemIdName = itemIdName;
//     this.itemName = itemName;
//     this.getValidatedData = getValidatedData;
//     this.extractId = extractId;
//   }

//   async getAll(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
//     const collection = await this.Service.getAll();

//     return this.successHandler.OK(res, collection);
//   }

//   async getOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
//     const id = this.extractId(req);
//     const isIdValid = validate(id);

//     if (!isIdValid) {
//       return this.errorHandler.badRequest(res, { message: `${this.itemIdName} is not valid` });
//     }

//     const item = await this.Service.getOne(id);

//     if (!item) {
//       return this.errorHandler.notFound(res, { message: `${this.itemName} not found` });
//     }

//     return this.successHandler.OK(res, item);
//   }

//   async createOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
//     const validatedData = await this.getValidatedData(req, res);

//     if (!validatedData) {
//       return;
//     }

//     const newItem = await this.Service.createOne(validatedData);

//     return this.successHandler.created(res, newItem);
//   }

//   async updateOne (req: HTTP_REQUEST, res: HTTP_RESPONCE) {
//     const id = this.extractId(req);
//     const isIdValid = validate(id);

//     if (!isIdValid) {
//       return this.errorHandler.badRequest(res, { message: `${this.itemIdName} is not valid` });
//     }

//     const item = await this.Service.getOne(id);

//     if (!item) {
//       return this.errorHandler.notFound(res, { message: `${this.itemName} not found` });
//     }

//     const bodyData = await getBodyData(req, res);

//     const newDataForItem = {
//       ...item,
//       ...bodyData,
//     };

//     const updatedItem = await this.Service.updateOne(id, newDataForItem);

//     return this.successHandler.OK(res, updatedItem);
//   }

//   public async deleteOne(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
//     const id = this.extractId(req);
//     const isIdValid = validate(id);

//     if (!isIdValid) {
//       return this.errorHandler.badRequest(res, { message: `${this.itemIdName} is not valid` });
//     }

//     const item = await this.Service.getOne(id);

//     if (!item) {
//       return this.errorHandler.notFound(res, { message: `${this.itemName} not found` });
//     }

//     await this.Service.deleteOne(id);
//     return this.successHandler.noContent(res, { message: `The ${this.itemName} has been deleted` });
//   }
// }

// export default BaseControllerClass;
