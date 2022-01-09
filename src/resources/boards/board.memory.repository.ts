import { BOARDS_LOCAL_DB_PATH } from "../../constants/paths";
import { getFromLocalDatabase, saveToLocalDatabase } from "../../utils/Utils";
import { BoardClass, IBoardToCreate } from "./board.model";

let boards: BoardClass[] = [];

const boardsFromLocalDb = getFromLocalDatabase(BOARDS_LOCAL_DB_PATH) as BoardClass[];

if (boardsFromLocalDb) {
  boards = boardsFromLocalDb;
}

const updateLocalDb = () => saveToLocalDatabase(BOARDS_LOCAL_DB_PATH, boards);

class BoardsRepo {
  /**
 * Get all boards
 * @returns \{Promise\} Promise object represents collection of boards
 */
  async getAll() {
    return boards;
  }

  /**
 * Get all filtered boards
 * @param filter - object with key to search and value to compare
 * @returns \{Promise\} Promise objects represents all boards corresponding to the filter
 */
  async search({ key, value }: { key: keyof BoardClass, value: string }) {
    const filteredCollection = boards.filter((elem: BoardClass) => elem[key] === value);
    return filteredCollection;
  }

  /**
 * Get one board by id
 * @param id - board id string
 * @returns \{Promise\} Promise object represents board with a passed id
 */
  async getOne(id: string) {
    return boards.find((elem) => elem.id === id);
  }

  /**
 * Create one board
 * @param itemData - object with board parameters;
 * @returns \{Promise\} Promise object represents newly create board
 */
  async createOne(itemData: IBoardToCreate) {
    const item = new BoardClass(itemData);

    boards.push(item);
    updateLocalDb();

    return item;
  }

  /**
 * Delete board by id
 * @param id - board id string
 */
  async deleteOne(id: string) {
    boards = boards.filter((elem) => elem.id !== id);
    updateLocalDb();
  }

  /**
 * Delete boards by filter
 * @param filter - object with key to search and value to compare
 */
  async deleteMany({ key, value }: { key: keyof BoardClass, value: string }) {
    const filteredCollection = boards.filter((elem) => elem[key] !== value);
    boards = filteredCollection;
    updateLocalDb();
  }

  /**
 * Update board by id
 * @param id - board id string
 * @param itemData - data to update a particular board
 * @returns \{Promise\} Promise object represents updated board
 */
  async updateOne(id: string, itemData: IBoardToCreate) {
    const itemIndex = boards.findIndex((elem) => elem.id === id);

    boards[itemIndex] = { ...boards[itemIndex], ...itemData };
    updateLocalDb();

    return boards[itemIndex];
  }

  /**
 * Update many boards found using filter
 * @param filter - object with key to search and value to compare
 * @param updates - data to update each board
 */
  async updateMany(filter: { key: keyof BoardClass, value: string }, updates: Partial<BoardClass>) {
    const filteredItems = boards.filter((elem: BoardClass) => elem[filter.key] === filter.value);
    const filteredItemsIndexes = filteredItems.map((elem) => boards.findIndex((collectionItem) => collectionItem.id === elem.id));

    for (let i = 0; i < filteredItemsIndexes.length; i += 1) {
      const index = filteredItemsIndexes[i];

      boards[index] = {
        ...boards[index],
        ...updates,
      };
    }

    updateLocalDb();
  }
}

export default new BoardsRepo();
