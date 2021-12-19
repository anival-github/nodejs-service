import { HTTP_REQUEST, HTTP_RESPONCE } from "../../types";
// const router = require('express').Router();
// const User = require('./user.model');
// const usersService = require('./user.service');

// router.route('/').get(async (req, res) => {
//   const users = await usersService.getAll();
//   // map user fields to exclude secret fields like "password"
//   res.json(users.map(User.toResponse));
// });

// module.exports = router;

import userController from './user.controller';
import HTTP_METHODS from '../../common/httpMethods';
import { STRICT_ROUTES } from '../../common/routes';

/**
 * Handle user related requests
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 */
const userRouter = (req: HTTP_REQUEST, res: HTTP_RESPONCE) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);

  switch (true) {
    case url.pathname.match(STRICT_ROUTES.USERS) && req.method === HTTP_METHODS.GET:
      userController.getAll(req, res);
      break;

    case url.pathname.match(STRICT_ROUTES.USERS_ID) && req.method === HTTP_METHODS.GET:
      userController.getOne(req, res);
      break;

    case url.pathname.match(STRICT_ROUTES.USERS) && req.method === HTTP_METHODS.POST:
      userController.createOne(req, res);
      break;

    case url.pathname.match(STRICT_ROUTES.USERS_ID) && req.method === HTTP_METHODS.PUT:
      userController.updateOne(req, res);
      break;

    case url.pathname.match(STRICT_ROUTES.USERS_ID) && req.method === HTTP_METHODS.DELETE:
      userController.deleteOne(req, res);
      break;

    default:
      break;
  }
};

export default userRouter;
