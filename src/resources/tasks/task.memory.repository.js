const BaseMemoryRepository = require("../../common/base.memory.repository");
const Model = require("./task.model");

class MemoryRepository extends BaseMemoryRepository {
  constructor () {
    super(Model);
  }
}

module.exports = new MemoryRepository();
