const BaseMemoryRepository = require("../../common/base.memory.repository");
const Board = require("./board.model");

class BoardMemoryRepository extends BaseMemoryRepository {
  constructor () {
    super(Board);
  }
}

module.exports = new BoardMemoryRepository();
