import { BoardClass, BoardDtoType } from '../../entity/board.entity';

import BoardsRepo from './board.memory.repository';

export class BoardService {
  /**
   * Get all boards
   * @returns \{Promise\} Promise object represents collection of boards
   */
  getAll() {
    return BoardsRepo.getAll();
  }

  /**
   * Get all filtered boards
   * @param filter - object with key to search and value to compare
   * @returns \{Promise\} Promise objects represents all boards corresponding to the filter
   */
  search({ key, value }: { key: keyof BoardClass, value: string }) {
    return BoardsRepo.search({ key, value });
  }

  /**
   * Get one board by id
   * @param id - board id string
   * @returns \{Promise\} Promise object represents board with a passed id
   */
  getOne(id: string) {
    return BoardsRepo.getOne(id);
  }

  /**
   * Create one board
   * @param newItem - object with board parameters;
   * @returns \{Promise\} Promise object represents newly create board
   */
  createOne(newItem: BoardDtoType) {
    return BoardsRepo.createOne(newItem);
  }

  /**
   * Delete board by id
   * @param id - board id string
   */
  deleteOne(id: string) {
    return BoardsRepo.deleteOne(id);
  }

  /**
   * Update board by id
   * @param id - board id string
   * @param newItemData - data to update a particular board
   * @returns \{Promise\} Promise object represents updated board
   */
  updateOne(id: string, newItemData: BoardDtoType) {
    return BoardsRepo.updateOne(id, newItemData);
  }

  // /**
  //  * Update many boards found using filter
  //  * @param filter - object with key to search and value to compare
  //  * @param updates - data to update each board
  //  */
  // updateMany(filter: { key: keyof BoardClass, value: string }, updates: Partial<BoardDtoType>) {
  //   return BoardsRepo.updateMany(filter, updates);
  // }
}

export default new BoardService();
