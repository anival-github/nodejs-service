import HTTP_METHODS from '../../constants/httpMethods';
import { STRICT_ROUTES } from '../../common/routes';
import ErrorHandler from '../../common/errorHandler';
import { RouterType } from '../../types/routerTypes';
import loginController from './login.controller';

/**
 * Handle task related requests
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 */
const loginRouter: RouterType = (req, res) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);

  switch (true) {
    case url.pathname.match(STRICT_ROUTES.LOGIN) && req.method === HTTP_METHODS.POST:
      loginController.uthenticate(req, res);
      break;

    default:
      ErrorHandler.notFound(req, res, { message: 'Route not found' });
      break;
  }
};

export default loginRouter;
