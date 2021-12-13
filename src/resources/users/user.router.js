// const router = require('express').Router();
// const User = require('./user.model');
// const usersService = require('./user.service');

// router.route('/').get(async (req, res) => {
//   const users = await usersService.getAll();
//   // map user fields to exclude secret fields like "password"
//   res.json(users.map(User.toResponse));
// });

// module.exports = router;

const userController = require('./user.controller');
const HTTP_METHODS = require('../../common/httpMethods');
const { STRICT_ROUTES } = require('../../common/routes');

const userRouter = (req, res) => {
  switch (true) {
    case req.url.match(STRICT_ROUTES.USERS) && req.method === HTTP_METHODS.GET:
      return userController.getAll(req, res)

    case req.url.match(STRICT_ROUTES.USERS_ID) && req.method === HTTP_METHODS.GET:
      return userController.getOne(req, res)

    case req.url.match(STRICT_ROUTES.USERS) && req.method === HTTP_METHODS.POST:
      return userController.createOne(req, res)

    case req.url.match(STRICT_ROUTES.USERS_ID) && req.method === HTTP_METHODS.PUT:
      return userController.updateOne(req, res)

    case req.url.match(STRICT_ROUTES.USERS_ID) && req.method === HTTP_METHODS.DELETE:
      return userController.deleteOne(req, res)

    default:
      return null;
  }
}

module.exports = userRouter;
