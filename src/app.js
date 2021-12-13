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
const http = require('http');
const { ROUTES } = require('./common/routes');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/board.router');
const errorHandler = require('./common/errorHandler');
const tasksRouter = require('./resources/tasks/task.router');

const app = http.createServer((req, res) => {
  try {
    switch (true) {
      case !!req.url.match(ROUTES.TASKS) || !!req.url.match(ROUTES.BOARD_ID_TASKS):
        return tasksRouter(req, res);

      case !!req.url.match(ROUTES.USERS):
        return userRouter(req, res);

      case !!req.url.match(ROUTES.BOARDS):{
        return boardsRouter(req, res);
      }

      default:
        return null;
    }
  } catch (error) {
    return errorHandler.internalServerError(res, { message: error.message });
  }
});

module.exports = app;
