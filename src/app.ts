// const express = require('express');
// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');
// const userRouter = require('./resources/users/user.router');

// const app = express();
// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// app.use(express.json());

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// app.use('/', (req, res, next) => {
//   if (req.originalUrl === '/') {
//     res.send('Service is running!');
//     return;
//   }
//   next();
// });

// app.use('/users', userRouter);

// module.exports = app;
import http from 'http';
import { ROUTES } from './common/routes';
import userRouter from './resources/users/user.router';
import boardsRouter from './resources/boards/board.router';
import errorHandler from './common/errorHandler';
import tasksRouter from './resources/tasks/task.router';
import { HTTP_REQUEST, HTTP_RESPONCE } from './types';
import { getErrorMessage } from './utils/Utils';

const app = http.createServer((req: HTTP_REQUEST, res: HTTP_RESPONCE) => {
  try {
    const url = new URL(req.url || '', `http://${req.headers.host}`);

    switch (true) {
      case !!url.pathname.match(ROUTES.TASKS) || !!url.pathname.match(ROUTES.BOARD_ID_TASKS):
        return tasksRouter(req, res);

      case !!url.pathname.match(ROUTES.USERS):
        return userRouter(req, res);

      case !!url.pathname.match(ROUTES.BOARDS): {
        return boardsRouter(req, res);
      }

      default:
        return null;
    }
  } catch (error) {
    return errorHandler.internalServerError(res, { message: getErrorMessage(error) });
  }
});

export default app;
