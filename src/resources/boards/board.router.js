const boardController = require('./board.controller');
const HTTP_METHODS = require('../../common/httpMethods');
const { STRICT_ROUTES } = require('../../common/routes');
const errorHandlers = require('../../common/errorHandler');

const boardsRouter = (req, res) => {
  switch (true) {
    case req.url.match(STRICT_ROUTES.BOARDS) && req.method === HTTP_METHODS.GET:
      return boardController.getAll(req, res)

    case req.url.match(STRICT_ROUTES.BOARDS_ID) && req.method === HTTP_METHODS.GET:
      return boardController.getOne(req, res)

    case req.url.match(STRICT_ROUTES.BOARDS) && req.method === HTTP_METHODS.POST:
      return boardController.createOne(req, res)

    case req.url.match(STRICT_ROUTES.BOARDS_ID) && req.method === HTTP_METHODS.PUT:
      return boardController.updateOne(req, res)

    case req.url.match(STRICT_ROUTES.BOARDS_ID) && req.method === HTTP_METHODS.DELETE:
      return boardController.deleteOne(req, res)

    default:
      return errorHandlers.notFound(res, { message: 'Route not found' });
  }
}

module.exports = boardsRouter;
