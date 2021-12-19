import { BoardClass, IBoardToCreate } from './board.model';

import BoardsRepo from './board.memory.repository';

export class BoardService {
  getAll() {
    return BoardsRepo.getAll();
  }

  search({ key, value }: { key: keyof BoardClass, value: string }) {
    return BoardsRepo.search({ key, value });
  }

  getOne(id: string) {
    return BoardsRepo.getOne(id);
  }

  createOne(newItem: IBoardToCreate) {
    return BoardsRepo.createOne(newItem);
  }

  deleteOne(id: string) {
    return BoardsRepo.deleteOne(id);
  }

  updateOne(id: string, newItemData: IBoardToCreate) {
    return BoardsRepo.updateOne(id, newItemData);
  }

  updateMany(filter: { key: keyof BoardClass, value: string }, updates: Partial<IBoardToCreate>) {
    return BoardsRepo.updateMany(filter, updates);
  }
}

export default new BoardService();
