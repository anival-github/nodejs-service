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

const userRouter = (req: HTTP_REQUEST, res: HTTP_RESPONCE) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);

  switch (true) {
    case url.pathname.match(STRICT_ROUTES.USERS) && req.method === HTTP_METHODS.GET:
      return userController.getAll(req, res);

    case url.pathname.match(STRICT_ROUTES.USERS_ID) && req.method === HTTP_METHODS.GET:
      return userController.getOne(req, res);

    case url.pathname.match(STRICT_ROUTES.USERS) && req.method === HTTP_METHODS.POST:
      return userController.createOne(req, res);

    case url.pathname.match(STRICT_ROUTES.USERS_ID) && req.method === HTTP_METHODS.PUT:
      return userController.updateOne(req, res);

    case url.pathname.match(STRICT_ROUTES.USERS_ID) && req.method === HTTP_METHODS.DELETE:
      return userController.deleteOne(req, res);

    default:
      return null;
  }
};

export default userRouter;
