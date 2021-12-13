const { validate } = require('uuid');
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');
const successHandler = require('../../common/successHandler');
const { getBodyData, extractFirstId } = require('../../utils/Utils');
const errorHandler = require('../../common/errorHandler');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  return successHandler.OK(res, users.map(User.toResponse))
};

const getOne = async (req, res) => {
  const id = extractFirstId(req);
  const isIdValid = validate(id);

  if (!isIdValid) {
    return errorHandler.badRequest(res, { message: 'UserId is not valid' });
  }

  const user = await usersService.getOne(id);

  if (!user) {
    return errorHandler.notFound(res, { message: 'User not found' });
  }

  return successHandler.OK(res, User.toResponse(user));
};

const createOne = async (req, res) => {
  const body = await getBodyData(req, res);

  const { name, login, password } = body;

  if (!name || !login || !password) {
    return errorHandler.badRequest({ message: 'Please, specify required fields: name, login, password' });
  }

  const newUser = await usersService.createOne({ name, login, password })

  return successHandler.created(res, User.toResponse(newUser));
}

const updateOne = async (req, res) => {
  const id = extractFirstId(req);
  const isIdValid = validate(id);

  if (!isIdValid) {
    return errorHandler.badRequest(res, { message: 'UserId is not valid' });
  }

  const user = await usersService.getOne(id);

  if (!user) {
    return errorHandler.notFound(res, { message: 'User not found' });
  }

  const { name, login, password } = await getBodyData(req, res);

  const newUserData = {
    name: name || user.name,
    login: login || user.login,
    password: password || user.password,
  };

  const updatedUser = await usersService.updateOne(id, newUserData);

  return successHandler.OK(res, User.toResponse(updatedUser));
}

const deleteOne = async (req, res) => {
  const id = extractFirstId(req);
  const isIdValid = validate(id);

  if (!isIdValid) {
    return errorHandler.badRequest(res, { message: 'UserId is not valid' });
  }

  const user = await usersService.getOne(id);

  if (!user) {
    return errorHandler.notFound(res, { message: 'User not found' });
  }

  await usersService.deleteOne(id);

  // When somebody DELETEs User, all Tasks where User is assignee should be updated to put userId = null.
  await tasksService.updateMany({ key: 'userId', value: id }, { userId: null });

  return successHandler.noContent(res, { message: 'The user has been deleted' });
};

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
};
