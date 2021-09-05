import BookModel from "../models/bookModel";
import logger from "../utils/logger";
import Errors from "../utils/errors";
import { BookRequestInterface, BookParamInterface } from "../interfaces/bookRequestInterface";
import { PaginationInterface } from "../interfaces/commonInterface";

export default class BookService {
  constructor() {}

  async getList(request: PaginationInterface): Promise<any> {
    try {
      const { query: { keyword, page, limit, sortBy, sortDir } } = request;
      const condition: any = { skip: 0, limit: 10, sort: {} };
      const skipVal: number = (+page - 1) * (+limit);
      condition.skip = skipVal;

      const query: any = {};
      if (sortBy) {
        condition.sort = { [sortBy]: sortDir || -1 };
      }
      if (keyword) {
        query.$and = [];
        query.$and.push({
          $or: [
            {title: {$regex: "(?i)" + keyword}},
            {author: {$regex: "(?i)" + keyword}},
          ]
        });
      }
      
      const data = await BookModel.find(query, null, condition).populate('createdBy').exec();
      if (!data) {
        return Errors.notFound();
      }
      const total = await BookModel.countDocuments(query);
      logger.info('[Fetch][Books] successfully');
      return {
        statusCode: 200,
        total,
        page,
        limit,
        results: [...data]
      };
    } catch(err) {
      logger.error(err);
      return Errors.badImplementation();
    }
  }

  async createBook(request: BookRequestInterface): Promise<any> {
    try {
      const result = await new BookModel(request.payload).save()
      logger.info('[Create][Books] successfully');
      return {
        statusCode: 200,
        result
      };
    } catch(error) {
      logger.error(error);
      return Errors.badImplementation();
    }
  }

  async getBook(request: BookParamInterface): Promise<any> {
    try {
      const result = await BookModel.findById(request.params.id).populate('createdBy').exec();
      if (!result) {
        return Errors.notFound();
      }
      logger.info('[View][Books] successfully');
      return {
        statusCode: 200,
        result
      };
    } catch(error) {
      logger.error(error);
      return Errors.badImplementation();
    }
  }

  async editBook(request: BookRequestInterface): Promise<any> {
    try {
      const payload: any = { ...request.payload, updatedAt: new Date().toISOString() }
      const data = await BookModel.findByIdAndUpdate(request.params.id, payload, { new: true });
      if (!data) {
        logger.error('[Update][Books] Can not update this book');
        return Errors.badRequest();
      }
      logger.info('[Update][Books] successfully');
      return {
        statusCode: 200,
        message: `${request.params.id} was updated.`
      };
    } catch(error) {
      logger.error(error);
      return Errors.badImplementation();
    }
  }

  async deleteBook(request: BookParamInterface): Promise<any> {
    try {
      const data = await BookModel.findByIdAndDelete(request.params.id).exec();
      if (!data) {
        logger.error('[Delete][Books] Can not delete');
        return Errors.badRequest();
      }
      logger.info(`[Delete][Books] ${request.params.id} was deleted.`);
      return {
        statusCode: 200,
        message: `${request.params.id} was deleted.`
      };
    } catch(error) {
      logger.error(error);
      return Errors.badImplementation();
    }
  }
}
