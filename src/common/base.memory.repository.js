class BaseMemoryRepository {
  constructor(ItemClass) {
    this.collection = [];
    this.ItemClass = ItemClass;
  }

  async getAll() {
    return this.collection;
  };

  async search({ key, value }) {
    const filteredCollection = this.collection.filter((elem) => elem[key] === value);
    return filteredCollection;
  };

  async getOne(id) {
    return this.collection.find((elem) => elem.id === id);
  }

  async createOne (itemData) {
    const item = new this.ItemClass(itemData)

    this.collection.push(item);
    return item;
  }

  async deleteOne (id) {
    this.collection = this.collection.filter((elem) => elem.id !== id);
  };

  async deleteMany ({ key, value }) {
    const filteredCollection = this.collection.filter((elem) => elem[key] !== value);
    this.collection = filteredCollection;
  };

  async updateOne (id, itemData) {
    const itemIndex = this.collection.findIndex((elem) => elem.id === id);

    this.collection[itemIndex] = { id, ...itemData };

    return this.collection[itemIndex];
  }

  async updateMany(filter, updates) {
    const filteredItems = this.collection.filter((elem) => elem[filter.key] === filter.value);
    const filteredItemsIndexes = filteredItems.map((elem) => this.collection.findIndex((collectionItem) => collectionItem.id === elem.id));

    for (let i = 0; i < filteredItemsIndexes.length; i += 1) {
      const index = filteredItemsIndexes[i];

      this.collection[index] = {
        ...this.collection[index],
        ...updates,
      }
    }
  }
}

module.exports = BaseMemoryRepository;
