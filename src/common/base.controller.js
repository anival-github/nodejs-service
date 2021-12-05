const { validate } = require('uuid');
const { getBodyData, extractFirstId } = require('../utils/Utils');
const { ErrorHandler } = require('./errorHandler');
const SuccessHandler = require('./successHandler');

class BaseController {
  constructor({
    Service,
    itemIdName,
    itemName,
    getValidatedData,
    extractId = extractFirstId,
  }) {
    this.Service = Service;
    this.successHandler = SuccessHandler;
    this.errorHandler = ErrorHandler;
    this.itemIdName = itemIdName;
    this.itemName = itemName;
    this.getValidatedData = getValidatedData;
    this.extractId = extractId;
  }

  async getAll (req, res) {
    const collection = await this.Service.getAll();

    return this.successHandler.OK(res, collection)
  };

  async getOne (req, res) {
    const id = this.extractId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      return this.errorHandler.badRequest(res, { message: `${this.itemIdName} is not valid` });
    }

    const item = await this.Service.getOne(id);

    if (!item) {
      return this.errorHandler.notFound(res, { message: `${this.itemName} not found` });
    }

    return this.successHandler.OK(res, item);
  };


  async createOne (req, res) {
    const validatedData = await this.getValidatedData(req, res);
    const newItem = await this.Service.createOne(validatedData)

    return this.successHandler.created(res, newItem);
  }

  async updateOne (req, res) {
    const id = this.extractId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      return this.errorHandler.badRequest(res, { message: `${this.itemIdName} is not valid` });
    }

    const item = await this.Service.getOne(id);

    if (!item) {
      return this.errorHandler.notFound(res, { message: `${this.itemName} not found` });
    }

    const bodyData = await getBodyData(req, res);

    const newDataForItem = {
      ...item,
      ...bodyData,
    };

    const updatedItem = await this.Service.updateOne(id, newDataForItem);

    return this.successHandler.OK(res, updatedItem);
  }

  async deleteOne (req, res) {
    const id = this.extractId(req);
    const isIdValid = validate(id);

    if (!isIdValid) {
      return this.errorHandler.badRequest(res, { message: `${this.itemIdName} is not valid` });
    }

    const item = await this.Service.getOne(id);

    if (!item) {
      return this.errorHandler.notFound(res, { message: `${this.itemName} not found` });
    }

    await this.Service.deleteOne(id);
    return this.successHandler.noContent(res, { message: `The ${this.itemName} has been deleted` });
  };
}

module.exports = BaseController;
