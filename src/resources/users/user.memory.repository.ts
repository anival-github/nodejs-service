import { getRepository } from "typeorm";
import User, { UserDtoType } from '../../entity/user.entity';
import logger from '../../common/logger';

class UsersRepo {
  /**
   * Get all users
   * @returns \{Promise\} Promise object represents collection of users
   */
  getAll = async () => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    return users;
  };

  /**
 * Get one user by id
 * @param id - user id string
 * @returns \{Promise\} Promise object represents user with a passed id
 */
  getOne = async (id: string) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);

    return user;
  }

  async search(searchParameters: Partial<User>) {
    const repository = getRepository(User);
    const user = await repository.findOne({ where: searchParameters });

    return user;
  }

  /**
 * Create one user
 * @param user - object with name: string, login: string, password: string;
 * @returns \{Promise\} Promise object represents newly create user
 */
  createOne = async ({ name, login, password }: {name: string; login: string; password: string }) => {
    try {
      const userRepository = getRepository(User);
      const user = new User({ name, login, password });
      await userRepository.save(user);

      return user;
    } catch (error) {
      logger.error('Error while saving user to db', {error});
      return null;
    }
  }

    /**
 * Delete user by id
 * @param id - user id string
 */
  deleteOne = async (id: string) => {
    const userRepository = getRepository(User);
    await userRepository.delete({ id });
  };

   /**
 * Update user by id
 * @param id - user id string
 * @param userData - data to update a particular user
 * @returns \{Promise\} Promise object represents updated user
 */
  updateOne = async (id: string, userData: UserDtoType) => {
    const userRepository = getRepository(User);
    const userToUpdate = await userRepository.findOne(id);

    const updatedUser = { ...userToUpdate, ...userData };

    await userRepository.save(updatedUser);

    return updatedUser;
  }
}

export default new UsersRepo();
