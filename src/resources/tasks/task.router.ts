import taskControllerInstance from './task.controller';
import HTTP_METHODS from '../../constants/httpMethods';
import { STRICT_ROUTES } from '../../common/routes';
import ErrorHandler from '../../common/errorHandler';
import { RouterType } from '../../types/routerTypes';
import { verifyToken } from '../../common/authorization';

/**
 * Handle task related requests
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 */
const tasksRouter: RouterType = (req, res) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);

  const token = verifyToken(req);

  if (!token) {
    ErrorHandler.unauthorized(req, res, { message: 'Failed to authanticate token' });
    return;
  }

  switch (true) {
    case url.pathname.match(STRICT_ROUTES.TASKS) && req.method === HTTP_METHODS.GET:
      taskControllerInstance.getAll(req, res);
      break;

    case url.pathname.match(STRICT_ROUTES.BOARD_ID_TASKS) && req.method === HTTP_METHODS.GET:
      taskControllerInstance.getAllByBoardId(req, res);
      break;

    case url.pathname.match(STRICT_ROUTES.BOARD_ID_TASKS_ID) && req.method === HTTP_METHODS.GET:
      taskControllerInstance.getOne(req, res);
      break;

    case url.pathname.match(STRICT_ROUTES.BOARD_ID_TASKS) && req.method === HTTP_METHODS.POST:
      taskControllerInstance.createOne(req, res);
      break;

    case url.pathname.match(STRICT_ROUTES.BOARD_ID_TASKS_ID) && req.method === HTTP_METHODS.PUT:
      taskControllerInstance.updateOne(req, res);
      break;

    case url.pathname.match(STRICT_ROUTES.BOARD_ID_TASKS_ID) && req.method === HTTP_METHODS.DELETE:
      taskControllerInstance.deleteOne(req, res);
      break;

    default:
      ErrorHandler.notFound(req, res, { message: 'Route not found' });
      break;
  }
};

export default tasksRouter;
