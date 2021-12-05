class BaseService {
    constructor(boardsRepo) {
        this.repo = boardsRepo;
    }

    getAll () {
        return this.repo.getAll()
    }

    search({ key, value }) {
        return this.repo.search({ key, value })
    }

    getOne (id) {
        return this.repo.getOne(id);
    }

    createOne (newItem) {
        return this.repo.createOne(newItem);
    }

    deleteOne (id) {
        return this.repo.deleteOne(id);
    }

    updateOne (id, newItemData) {
        return this.repo.updateOne(id, newItemData);
    }

    updateMany(filter, updates) {
        return this.repo.updateMany(filter, updates)
    }
}

module.exports = BaseService;
