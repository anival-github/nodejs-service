import usersRepo from './user.memory.repository';
import { UserDtoType } from '../../entity/user.entity';

class UserService {
  /**
 * Get all users
 * @returns \{Promise\} Promise object represents collection of users
 */
  getAll = () => usersRepo.getAll();

  /**
 * Get one user by id
 * @param id - user id string
 * @returns \{Promise\} Promise object represents user with a passed id
 */
  getOne = (id: string) => usersRepo.getOne(id);

  /**
 * Create one user
 * @param user - object with name: string, login: string, password: string;
 * @returns \{Promise\} Promise object represents newly create user
 */
  createOne = (user: UserDtoType) => usersRepo.createOne(user);


  /**
 * Delete user by id
 * @param id - user id string
 */
  deleteOne = (id: string) => {
    usersRepo.deleteOne(id)
  };

  /**
 * Update user by id
 * @param id - user id string
 * @param newUserData - data to update a particular user
 * @returns \{Promise\} Promise object represents updated user
 */
  updateOne = (id: string, newUserData: UserDtoType) => usersRepo.updateOne(id, newUserData);
}

export default new UserService();
