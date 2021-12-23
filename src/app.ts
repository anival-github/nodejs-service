import http from 'http';
import { ROUTES } from './common/routes';
import userRouter from './resources/users/user.router';
import boardsRouter from './resources/boards/board.router';
import errorHandler from './common/errorHandler';
import tasksRouter from './resources/tasks/task.router';
import { HTTP_REQUEST, HTTP_RESPONCE } from './types';
import { getErrorMessage } from './utils/Utils';

const app = http.createServer(
  /**
   * Handle app requests
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  (req: HTTP_REQUEST, res: HTTP_RESPONCE) => {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`);

      switch (true) {
        case !!url.pathname.match(ROUTES.TASKS) || !!url.pathname.match(ROUTES.BOARD_ID_TASKS):
          tasksRouter(req, res);
          break;

        case !!url.pathname.match(ROUTES.USERS):
          userRouter(req, res);
          break;

        case !!url.pathname.match(ROUTES.BOARDS): {
          boardsRouter(req, res);
          break;
        }

        default:
          break;
      }
    } catch (error) {
      errorHandler.internalServerError(req, res, { message: getErrorMessage(error) });
    }
  });

export default app;
