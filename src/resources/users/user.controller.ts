import { validate } from 'uuid';
import User, { UserDtoType } from '../../entity/user.entity';
import usersService from './user.service';
import TaskServiceInstance from '../tasks/task.service';
import successHandler from '../../common/successHandler';
import { getBodyData, extractFirstId } from '../../utils/Utils';
import errorHandler from '../../common/errorHandler';
import { ControllerType } from '../../types/controllerTypes';

class UserController {
  /**
   * Handle get all request
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  getAll: ControllerType = async (req, res) => {
    const users = await usersService.getAll();

    successHandler.OK(req, res, users.map(User.toResponse));
    // Use for docker dev mode check
    // successHandler.OK(req, res, []);
  };

  /**
   * Handle get one request
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  getOne: ControllerType = async (req, res) => {
    const id = extractFirstId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      errorHandler.badRequest(req, res, { message: 'UserId is not valid' });
      return
    }

    const user = await usersService.getOne(id);

    if (!user) {
      errorHandler.notFound(req, res, { message: 'User not found' });
      return
    }

    successHandler.OK(req, res, User.toResponse(user));
  };

  /**
   * Handle create one request
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  createOne: ControllerType = async (req, res) => {
    const body = await getBodyData(req, res) as UserDtoType;

    const { name, login, password } = body;

    if (!name || !login || !password) {
      errorHandler.badRequest(req, res, { message: 'Please, specify required fields: name, login, password' }, body);
      return
    }

    const newUser = await usersService.createOne({ name, login, password }, );

    if (newUser) {
      successHandler.created(req, res, User.toResponse(newUser), body);
    }
  };

  /**
   * Handle update one request
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  updateOne: ControllerType = async (req, res) => {
    const id = extractFirstId(req);
    const isIdValid = validate(id);
    const newUserData = await getBodyData(req, res) as UserDtoType;

    if (!isIdValid) {
      errorHandler.badRequest(req, res, { message: 'UserId is not valid' }, newUserData);
      return
    }

    const user = await usersService.getOne(id);

    if (!user) {
      errorHandler.notFound(req, res, { message: 'User not found' }, newUserData);
      return
    }

    const updatedUser = await usersService.updateOne(id, newUserData) as User;

    successHandler.OK(req, res, User.toResponse(updatedUser), newUserData);
  };

  /**
   * Handle delete one request
   * @param req - http request class IncomingMessage
   * @param res - http response class ServerResponse
   */
  deleteOne: ControllerType = async (req, res) => {
    const id = extractFirstId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      errorHandler.badRequest(req, res, { message: 'UserId is not valid' });
      return;
    }

    const user = await usersService.getOne(id);

    if (!user) {
      errorHandler.notFound(req, res, { message: 'User not found' });
      return;
    }

    await usersService.deleteOne(id);

    // When somebody DELETEs User, all Tasks where User is assignee should be updated to put userId = null.
    await TaskServiceInstance.updateMany({ key: 'userId', value: id }, { userId: null });

    successHandler.noContent(req, res, { message: 'The user has been deleted' });
  };
}

export default new UserController();
