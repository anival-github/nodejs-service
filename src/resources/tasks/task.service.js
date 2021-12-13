const BaseService = require('../../common/base.service');
const repo = require('./task.memory.repository');

class Service extends BaseService {
    constructor() {
        super(repo)
    }

    getAllByBoardId (boardId) {
        return this.repo.search({ key: 'boardId', value: boardId })
    }

    deleteAllByBoardId (boardId) {
        return this.repo.deleteMany({ key: 'boardId', value: boardId })
    }
}

module.exports = new Service();
