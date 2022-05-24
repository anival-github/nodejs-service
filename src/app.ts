import { createConnection } from 'typeorm';
import "reflect-metadata";
import http from 'http';
import { ROUTES } from './common/routes';
import userRouter from './resources/users/user.router';
import boardsRouter from './resources/boards/board.router';
import errorHandler from './common/errorHandler';
import tasksRouter from './resources/tasks/task.router';
import { getErrorMessage } from './utils/Utils';
import User from "./entity/user.entity";
import config from './common/config';
import TaskClass from './entity/task.entity';
import { BoardClass } from './entity/board.entity';
import { UserMigration1642361078900 } from './migration/1642361078900-UserMigration';
import { TaskMigration1642361482905 } from './migration/1642361482905-TaskMigration';
import { BoardMigration1642361495452 } from './migration/1642361495452-BoardMigration';
import logger from './common/logger';
import loginRouter from './resources/login/login.router';

createConnection({
  type: "postgres",
  host: "postgres",
  port: config.POSTGRES_PORT,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  entities: [
      User,
      TaskClass,
      BoardClass,
  ],
  synchronize: true,
  logging: false,
  migrations: [
    UserMigration1642361078900,
    TaskMigration1642361482905,
    BoardMigration1642361495452,
  ],
  migrationsRun: true,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
}).then((connection) => {
  logger.info('Connection is created');

  const app = http.createServer(
  /**
  * Handle app requests
  * @param req - http request class IncomingMessage
  * @param res - http response class ServerResponse
  */
  (req, res) => {
   try {
     const url = new URL(req.url || '', `http://${req.headers.host}`);

     switch (true) {
       case !!url.pathname.match(ROUTES.TASKS) || !!url.pathname.match(ROUTES.BOARD_ID_TASKS):
         tasksRouter(req, res);
         break;

       case !!url.pathname.match(ROUTES.LOGIN):
         loginRouter(req, res);
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

  app.listen(config.PORT, () => {
    logger.info(`App is running on http://localhost:${config.PORT}`);
  });

}).catch(error => logger.info('Error while creating connection', error));
