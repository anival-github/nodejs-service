const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getOne = (id) => usersRepo.getOne(id);

const createOne = (user) => usersRepo.createOne(user);

const deleteOne = (id) => usersRepo.deleteOne(id);

const updateOne = (id, newUserData) => usersRepo.updateOne(id, newUserData);

module.exports = {
    getAll,
    getOne,
    createOne,
    deleteOne,
    updateOne,
};
