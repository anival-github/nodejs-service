const User = require('./user.model');

let users = [];

// TODO: mock implementation. should be replaced during task development
const getAll = async () => users;

const getOne = async (id) => {
  const user = users.find((elem) => elem.id === id);

  return user;
}

const createOne = async ({ name, login, password }) => {
  const user = new User({ name, login, password });

  users.push(user);
  return user;
}

const deleteOne = async (id) => {
  users = users.filter((user) => user.id !== id);
};

const updateOne = async (id, userData) => {
  const userIndex = users.findIndex((elem) => elem.id === id);

  users[userIndex] = { id, ...userData };

  return users[userIndex];
}

module.exports = {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
};
