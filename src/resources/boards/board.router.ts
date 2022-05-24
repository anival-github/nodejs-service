import BoardController from './board.controller';
import HTTP_METHODS from '../../constants/httpMethods';
import { STRICT_ROUTES } from '../../common/routes';
import errorHandlers from '../../common/errorHandler';
import { RouterType } from '../../types/routerTypes';
import { verifyToken } from '../../common/authorization';

/**
 * Handle board related requests
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 */
const boardsRouter: RouterType = (req, res) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);

  const token = verifyToken(req);

  if (!token) {
    errorHandlers.unauthorized(req, res, { message: 'Failed to authanticate token' });
    return;
  }

  switch (true) {
    case url.pathname.match(STRICT_ROUTES.BOARDS) && req.method === HTTP_METHODS.GET:
      BoardController.getAll(req, res);
      break;

    case url.pathname.match(STRICT_ROUTES.BOARDS_ID) && req.method === HTTP_METHODS.GET:
      BoardController.getOne(req, res);
      break;

    case url.pathname.match(STRICT_ROUTES.BOARDS) && req.method === HTTP_METHODS.POST:
      BoardController.createOne(req, res);
      break;

    case url.pathname.match(STRICT_ROUTES.BOARDS_ID) && req.method === HTTP_METHODS.PUT:
      BoardController.updateOne(req, res);
      break;

    case url.pathname.match(STRICT_ROUTES.BOARDS_ID) && req.method === HTTP_METHODS.DELETE:
      BoardController.deleteOne(req, res);
      break;

    default:
      errorHandlers.notFound(req, res, { message: 'Route not found' });
      break;
  }
};

export default boardsRouter;
