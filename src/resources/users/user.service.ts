import { encript } from "../../common/encripting";
import usersRepo from './user.memory.repository';
import User, { UserDtoType } from '../../entity/user.entity';

class UserService {
  /**
 * Get all users
 * @returns \{Promise\} Promise object represents collection of users
 */
  getAll = async () => usersRepo.getAll();

  /**
 * Get one user by id
 * @param id - user id string
 * @returns \{Promise\} Promise object represents user with a passed id
 */
  getOne = async (id: string) => usersRepo.getOne(id);

  search = async (searchParameters: Partial<User>) => usersRepo.search(searchParameters)

  /**
 * Create one user
 * @param user - object with name: string, login: string, password: string;
 * @returns \{Promise\} Promise object represents newly create user
 */
  createOne = async (user: UserDtoType) => {
    const { password } = user;

    const encriptedPassword = await encript(password);

    return usersRepo.createOne({
      ...user,
      password: encriptedPassword,
    })
  };

  /**
 * Delete user by id
 * @param id - user id string
 */
  deleteOne = async (id: string) => {
    usersRepo.deleteOne(id)
  };

  /**
 * Update user by id
 * @param id - user id string
 * @param newUserData - data to update a particular user
 * @returns \{Promise\} Promise object represents updated user
 */
  updateOne = async (id: string, newUserData: UserDtoType) => {
    const userDataToUpdate = newUserData;

    if (newUserData.password) {
      const encriptedPassword = await encript(newUserData.password);

      userDataToUpdate.password = encriptedPassword;
    }

    return usersRepo.updateOne(id, newUserData);
  };
}

export default new UserService();
