import taskControllerInstance from './task.controller';
import HTTP_METHODS from '../../common/httpMethods';
import { STRICT_ROUTES } from '../../common/routes';
import errorHandlers from '../../common/errorHandler';
import { HTTP_REQUEST, HTTP_RESPONCE } from '../../types';

const tasksRouter = (req: HTTP_REQUEST, res: HTTP_RESPONCE) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);

  switch (true) {
    case url.pathname.match(STRICT_ROUTES.TASKS) && req.method === HTTP_METHODS.GET:
      return taskControllerInstance.getAll(req, res);

    case url.pathname.match(STRICT_ROUTES.BOARD_ID_TASKS) && req.method === HTTP_METHODS.GET:
      return taskControllerInstance.getAllByBoardId(req, res);

    case url.pathname.match(STRICT_ROUTES.BOARD_ID_TASKS_ID) && req.method === HTTP_METHODS.GET:
      return taskControllerInstance.getOne(req, res);

    case url.pathname.match(STRICT_ROUTES.BOARD_ID_TASKS) && req.method === HTTP_METHODS.POST:
      return taskControllerInstance.createOne(req, res);

    case url.pathname.match(STRICT_ROUTES.BOARD_ID_TASKS_ID) && req.method === HTTP_METHODS.PUT:
      return taskControllerInstance.updateOne(req, res);

    case url.pathname.match(STRICT_ROUTES.BOARD_ID_TASKS_ID) && req.method === HTTP_METHODS.DELETE:
      return taskControllerInstance.deleteOne(req, res);

    default:
      return errorHandlers.notFound(res, { message: 'Route not found' });
  }
};

export default tasksRouter;
