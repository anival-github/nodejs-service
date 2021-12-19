import BoardController from './board.controller';
import HTTP_METHODS from '../../common/httpMethods';
import { STRICT_ROUTES } from '../../common/routes';
import errorHandlers from '../../common/errorHandler';
import { HTTP_REQUEST, HTTP_RESPONCE } from '../../types';

const boardsRouter = (req: HTTP_REQUEST, res: HTTP_RESPONCE) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);

  switch (true) {
    case url.pathname.match(STRICT_ROUTES.BOARDS) && req.method === HTTP_METHODS.GET:
      return BoardController.getAll(req, res);

    case url.pathname.match(STRICT_ROUTES.BOARDS_ID) && req.method === HTTP_METHODS.GET:
      return BoardController.getOne(req, res);

    case url.pathname.match(STRICT_ROUTES.BOARDS) && req.method === HTTP_METHODS.POST:
      return BoardController.createOne(req, res);

    case url.pathname.match(STRICT_ROUTES.BOARDS_ID) && req.method === HTTP_METHODS.PUT:
      return BoardController.updateOne(req, res);

    case url.pathname.match(STRICT_ROUTES.BOARDS_ID) && req.method === HTTP_METHODS.DELETE:
      return BoardController.deleteOne(req, res);

    default:
      return errorHandlers.notFound(res, { message: 'Route not found' });
  }
};

export default boardsRouter;
