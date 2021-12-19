import { BoardClass, IBoardToCreate } from "./board.model";

let boards: BoardClass[]  = [];

class BoardsRepo {
  async getAll() {
    return boards;
  }

  async search({ key, value }: { key: keyof BoardClass, value: string }) {
    const filteredCollection = boards.filter((elem: BoardClass) => elem[key] === value);
    return filteredCollection;
  }

  async getOne(id: string) {
    return boards.find((elem) => elem.id === id);
  }

  async createOne(itemData: IBoardToCreate) {
    const item = new BoardClass(itemData);

    boards.push(item);
    return item;
  }

  async deleteOne(id: string) {
    boards = boards.filter((elem) => elem.id !== id);
  }

  async deleteMany({ key, value }: { key: keyof BoardClass, value: string }) {
    const filteredCollection = boards.filter((elem) => elem[key] !== value);
    boards = filteredCollection;
  }

  async updateOne(id: string, itemData: IBoardToCreate) {
    const itemIndex = boards.findIndex((elem) => elem.id === id);

    boards[itemIndex] = { ...boards[itemIndex], ...itemData };

    return boards[itemIndex];
  }

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
  }
}

export default new BoardsRepo();
