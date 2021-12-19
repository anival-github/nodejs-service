import usersRepo from './user.memory.repository';
import { IUserToCreate } from './user.model';

class userService {
  getAll = () => usersRepo.getAll();

  getOne = (id: string) => usersRepo.getOne(id);

  createOne = (user: IUserToCreate) => usersRepo.createOne(user);

  deleteOne = (id: string) => usersRepo.deleteOne(id);

  updateOne = (id: string, newUserData: { name: string; login: string; password: string }) => usersRepo.updateOne(id, newUserData);
}

export default new userService();
