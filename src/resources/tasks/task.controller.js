const { validate } = require("uuid");
const BaseController = require("../../common/base.controller");
const { extractSecondId, extractFirstId } = require("../../utils/Utils");
const Service = require("./task.service");
const { getValidatedData } = require('./task.validatior');

class TaskController extends BaseController {
  constructor() {
    super({
      Service,
      itemIdName: 'TaskId',
      itemName: 'Task',
      getValidatedData,
      extractId: extractSecondId,
    })
  }

  async getAllByBoardId (req, res) {
    const boardId = extractFirstId(req);
    const isIdValid = validate(boardId);

    if (!isIdValid) {
      return this.errorHandler.badRequest(res, { message: 'BoardId is not valid' });
    }

    const items = await this.Service.search({ key: 'boardId', value: boardId });

    if (!items || (items && !items.length)) {
      return this.errorHandler.notFound(res, { message: `${this.itemName}s not found` });
    }

    return this.successHandler.OK(res, items);
  };
}

module.exports = new TaskController();
