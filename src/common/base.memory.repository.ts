// import { BoardClass, IBoard } from "../resources/boards/board.model";
// import TaskClass, { ITask } from "../resources/tasks/task.model";

// class BaseMemoryRepository {
//   collection: TaskClass[] | BoardClass[];

//   ItemClass: ITask | IBoard;

//   constructor(ItemClass: ITask | IBoard) {
//     this.collection = [];
//     this.ItemClass = ItemClass;
//   }

//   async getAll() {
//     return this.collection;
//   }

//   async search({ key, value }: { key: string, value: string }) {
//     const filteredCollection = this.collection.filter((elem: TaskClass) => elem[key] === value);
//     return filteredCollection;
//   }

//   async getOne(id: string) {
//     return this.collection.find((elem) => elem.id === id);
//   }

//   async createOne(itemData: TaskClass | BoardClass) {
//     const item = new this.ItemClass(itemData);

//     this.collection.push(item);
//     return item;
//   }

//   async deleteOne(id: string) {
//     this.collection = this.collection.filter((elem) => elem.id !== id);
//   }

//   async deleteMany({ key, value }: { key: string, value: string }) {
//     const filteredCollection = this.collection.filter((elem) => elem[key] !== value);
//     this.collection = filteredCollection;
//   }

//   async updateOne(id: string, itemData: TaskClass) {
//     const itemIndex = this.collection.findIndex((elem) => elem.id === id);

//     this.collection[itemIndex] = { ...this.collection[itemIndex], ...itemData };

//     return this.collection[itemIndex];
//   }

//   async updateMany(filter: { key: string, value: string }, updates: Partial<TaskClass>) {
//     const filteredItems = this.collection.filter((elem: TaskClass) => elem[filter.key] === filter.value);
//     const filteredItemsIndexes = filteredItems.map((elem) => this.collection.findIndex((collectionItem) => collectionItem.id === elem.id));

//     for (let i = 0; i < filteredItemsIndexes.length; i += 1) {
//       const index = filteredItemsIndexes[i];

//       this.collection[index] = {
//         ...this.collection[index],
//         ...updates,
//       };
//     }
//   }
// }

// export default BaseMemoryRepository;
