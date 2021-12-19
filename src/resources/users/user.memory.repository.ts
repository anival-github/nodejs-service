import User from './user.model';

let users: User[] = [];

class UsersRepo {
  getAll = async () => users;

  getOne = async (id: string) => {
    const user = users.find((elem) => elem.id === id);

    return user;
  }

  createOne = async ({ name, login, password }: {name: string; login: string; password: string }) => {
    const user = new User({ name, login, password });

    users.push(user);
    return user;
  }

  deleteOne = async (id: string) => {
    users = users.filter((user) => user.id !== id);
  };

  updateOne = async (id: string, userData: { name: string; login: string; password: string }) => {
    const userIndex = users.findIndex((elem) => elem.id === id);

    users[userIndex] = { id, ...userData };

    return users[userIndex];
  }
}

export default new UsersRepo();
