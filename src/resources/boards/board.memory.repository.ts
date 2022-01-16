import { Equal, getRepository } from "typeorm";
import { BoardClass, BoardDtoType } from "../../entity/board.entity";

class BoardsRepo {
  /**
   * Get all boards
   * @returns \{Promise\} Promise object represents collection of boards
   */
  async getAll() {
    const boardRepository = getRepository(BoardClass);
    const boards = await boardRepository.find();

    return boards;
  }

  /**
   * Get all filtered boards
   * @param filter - object with key to search and value to compare
   * @returns \{Promise\} Promise objects represents all boards corresponding to the filter
   */
  async search({ key, value }: { key: keyof BoardClass, value: string }) {
    const boardRepository = getRepository(BoardClass);

    const filteredCollection = await boardRepository.find({ [key]: Equal(value) });

    return filteredCollection;
  }

  /**
   * Get one board by id
   * @param id - board id string
   * @returns \{Promise\} Promise object represents board with a passed id
   */
  async getOne(id: string) {
    const boardRepository = getRepository(BoardClass);
    const board = await boardRepository.findOne(id);

    if (!board) {
      return null;
    }

    return BoardClass.toResponse(board);
  }

  /**
   * Create one board
   * @param itemData - object with board parameters;
   * @returns \{Promise\} Promise object represents newly create board
   */
  async createOne(itemData: BoardDtoType) {
    const boardRepository = getRepository(BoardClass);
    const item = new BoardClass(itemData);

    await boardRepository.save(item);

    return item;
  }

  /**
   * Delete board by id
   * @param id - board id string
   */
  async deleteOne(id: string) {
    const boardRepository = getRepository(BoardClass);

    await boardRepository.delete({ id })
  }

  /**
   * Delete boards by filter
   * @param filter - object with key to search and value to compare
   */
  async deleteMany({ key, value }: { key: keyof BoardClass, value: string }) {
    const boardRepository = getRepository(BoardClass);

    await boardRepository.delete({ [key]: Equal(value) });
  }

  /**
   * Update board by id
   * @param id - board id string
   * @param itemData - data to update a particular board
   * @returns \{Promise\} Promise object represents updated board
   */
  async updateOne(id: string, itemData: BoardDtoType) {
    const boardRepository = getRepository(BoardClass);
    const boardToUpdate = await boardRepository.findOne(id);

    if (!boardToUpdate) {
      return null;
    }

    const updatedBoard = {
      ...boardToUpdate,
      title: itemData.title,
      columns: JSON.stringify(itemData.columns),
    };
    await boardRepository.save(updatedBoard);

    return {
      ...boardToUpdate,
      title: itemData.title,
      columns: itemData.columns,
    };
  }

  /**
   * Update many boards found using filter
   * @param filter - object with key to search and value to compare
   * @param updates - data to update each board
   */
  async updateMany({ key, value }: { key: keyof BoardClass, value: string }, updates: Partial<BoardClass>) {
    const boardRepository = getRepository(BoardClass);
    const filteredItems = await boardRepository.find({ [key]: Equal(value) });

    const promises = filteredItems.map((boardToUpdate: BoardClass) => {
      const updatedBoard = {
        ...boardToUpdate,
        ...updates,
      };

      return boardRepository.save(updatedBoard);
    })

    await Promise.all(promises);
  }
}

export default new BoardsRepo();
