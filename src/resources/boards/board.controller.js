const BaseController = require("../../common/base.controller");
const BoardService = require("./board.service");
const TaskService = require("../tasks/task.service");
const { getValidatedData } = require('./board.validatior');

class BoardController extends BaseController {
  constructor() {
    super({
      Service: BoardService,
      itemIdName: 'BoardId',
      itemName: 'Board',
      getValidatedData,
    })

    this.tasksService = TaskService;

    const superClassDeleteOne = this.deleteOne;

    this.deleteOne = function deleteOne(req, res) {
      superClassDeleteOne.call(this, req, res);

      const id = this.extractId(req);

      this.tasksService.deleteAllByBoardId(id)
    }
  }
}

module.exports = new BoardController();
