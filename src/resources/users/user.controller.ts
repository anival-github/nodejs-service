import { validate } from 'uuid';
import { HTTP_RESPONCE , HTTP_REQUEST } from "../../types";
import User, { IUserToCreate } from './user.model';
import usersService from './user.service';
import TaskServiceInstance from '../tasks/task.service';
import successHandler from '../../common/successHandler';
import { getBodyData, extractFirstId } from '../../utils/Utils';
import errorHandler from '../../common/errorHandler';

class UserController {
/**
 * Handle get all request
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 */
  getAll = async (req: HTTP_REQUEST, res: HTTP_RESPONCE) => {
    const users = await usersService.getAll();

    successHandler.OK(res, users.map(User.toResponse));
  };

/**
 * Handle get one request
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 */
  getOne = async (req: HTTP_REQUEST, res: HTTP_RESPONCE) => {
    const id = extractFirstId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      errorHandler.badRequest(res, { message: 'UserId is not valid' });
      return
    }

    const user = await usersService.getOne(id);

    if (!user) {
      errorHandler.notFound(res, { message: 'User not found' });
      return
    }

    successHandler.OK(res, User.toResponse(user));
  };

  /**
 * Handle create one request
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 */
  createOne = async (req: HTTP_REQUEST, res: HTTP_RESPONCE) => {
    const body = await getBodyData(req, res) as IUserToCreate;

    const { name, login, password } = body;

    if (!name || !login || !password) {
      errorHandler.badRequest(res, { message: 'Please, specify required fields: name, login, password' });
      return
    }

    const newUser = await usersService.createOne({ name, login, password });

    successHandler.created(res, User.toResponse(newUser));
  };

  /**
 * Handle update one request
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 */
  updateOne = async (req: HTTP_REQUEST, res: HTTP_RESPONCE) => {
    const id = extractFirstId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      errorHandler.badRequest(res, { message: 'UserId is not valid' });
      return
    }

    const user = await usersService.getOne(id);

    if (!user) {
      errorHandler.notFound(res, { message: 'User not found' });
      return
    }

    const { name, login, password } = await getBodyData(req, res) as IUserToCreate;

    const newUserData = {
      name: name || user.name,
      login: login || user.login,
      password: password || user.password,
    };

    const updatedUser = await usersService.updateOne(id, newUserData);

    successHandler.OK(res, User.toResponse(updatedUser));
  };

  /**
 * Handle delete one request
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 */
  deleteOne = async (req: HTTP_REQUEST, res: HTTP_RESPONCE) => {
    const id = extractFirstId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      errorHandler.badRequest(res, { message: 'UserId is not valid' });
      return;
    }

    const user = await usersService.getOne(id);

    if (!user) {
      errorHandler.notFound(res, { message: 'User not found' });
      return;
    }

    await usersService.deleteOne(id);

    // When somebody DELETEs User, all Tasks where User is assignee should be updated to put userId = null.
    await TaskServiceInstance.updateMany({ key: 'userId', value: id }, { userId: null });

    successHandler.noContent(res, { message: 'The user has been deleted' });
  };
}

export default new UserController();
