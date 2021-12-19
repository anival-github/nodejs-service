import User from './user.model';

let users: User[] = [];

class UsersRepo {
  /**
 * Get all users
 * @returns \{Promise\} Promise object represents collection of users
 */
  getAll = async () => users;

  /**
 * Get one user by id
 * @param id - user id string
 * @returns \{Promise\} Promise object represents user with a passed id
 */
  getOne = async (id: string) => {
    const user = users.find((elem) => elem.id === id);

    return user;
  }

  /**
 * Create one user
 * @param user - object with name: string, login: string, password: string;
 * @returns \{Promise\} Promise object represents newly create user
 */
  createOne = async ({ name, login, password }: {name: string; login: string; password: string }) => {
    const user = new User({ name, login, password });

    users.push(user);
    return user;
  }

    /**
 * Delete user by id
 * @param id - user id string
 */
  deleteOne = async (id: string) => {
    users = users.filter((user) => user.id !== id);
  };

   /**
 * Update user by id
 * @param id - user id string
 * @param userData - data to update a particular user
 * @returns \{Promise\} Promise object represents updated user
 */
  updateOne = async (id: string, userData: { name: string; login: string; password: string }) => {
    const userIndex = users.findIndex((elem) => elem.id === id);

    users[userIndex] = { id, ...userData };

    return users[userIndex];
  }
}

export default new UsersRepo();