const taskController = require('./task.controller');
const HTTP_METHODS = require('../../common/httpMethods');
const { STRICT_ROUTES } = require('../../common/routes');
const errorHandlers = require('../../common/errorHandler');

const tasksRouter = (req, res) => {
  switch (true) {
    case req.url.match(STRICT_ROUTES.TASKS) && req.method === HTTP_METHODS.GET:
      return taskController.getAll(req, res)

    case req.url.match(STRICT_ROUTES.BOARD_ID_TASKS) && req.method === HTTP_METHODS.GET:
      return taskController.getAllByBoardId(req, res)

    case req.url.match(STRICT_ROUTES.BOARD_ID_TASKS_ID) && req.method === HTTP_METHODS.GET:
      return taskController.getOne(req, res)

    case req.url.match(STRICT_ROUTES.BOARD_ID_TASKS) && req.method === HTTP_METHODS.POST:
      return taskController.createOne(req, res)

    case req.url.match(STRICT_ROUTES.BOARD_ID_TASKS_ID) && req.method === HTTP_METHODS.PUT:
      return taskController.updateOne(req, res)

    case req.url.match(STRICT_ROUTES.BOARD_ID_TASKS_ID) && req.method === HTTP_METHODS.DELETE:
      return taskController.deleteOne(req, res)

    default:
      return errorHandlers.notFound(res, { message: 'Route not found' });
  }
}

module.exports = tasksRouter;
