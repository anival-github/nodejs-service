const BaseService = require('../../common/base.service');
const boardsRepo = require('./board.memory.repository');

class BoardService extends BaseService {
    constructor() {
        super(boardsRepo)
    }
}

module.exports = new BoardService();
