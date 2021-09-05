import VoucherModel from "../models/voucherModel";
import logger from "../utils/logger";
import Errors from "../utils/errors";
import { VoucherIssueInterface } from "../interfaces/voucherRequestInterface";
import { PaginationInterface, ParamInterface } from "../interfaces/commonInterface";

export default class VoucherService {
  constructor() {}

  async index(request: PaginationInterface): Promise<any> {
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
            {code: {$regex: "(?i)" + keyword}}
          ]
        });
      }
      
      const data = await VoucherModel.find(query, null, condition).exec();
      if (!data) {
        return Errors.notFound();
      }
      const total = await VoucherModel.countDocuments(query);
      logger.info('[Fetch][Vouchers] successfully');
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

  async delete(request: ParamInterface): Promise<any> {
    try {
      // const data = await VoucherModel.findByIdAndDelete(request.params.id).exec();
      // if (!data) {
      //   logger.error('[Delete][Vouchers] Can not delete');
      //   return Errors.badRequest();
      // }
      await VoucherModel.remove();
      logger.info(`[Delete][Vouchers] ${request.params.id} was deleted.`);
      return {
        statusCode: 200,
        message: `${request.params.id} was deleted.`
      };
    } catch (error) {
      logger.error(error);
      return Errors.badImplementation();
    }
  }

  async create(request: VoucherIssueInterface): Promise<any> {
  }

  async issue(request: VoucherIssueInterface, session): Promise<any> {
    try {
      return await VoucherModel.create([request.payload], { session });
    } catch(err) {
      return err;
    }
  }

  async countByEvent(request: any, session?: any): Promise<any> {
    try {
      if (session) {
        return await VoucherModel.countDocuments({ eventId: request.eventId }).session(session);
      } else {
        return await VoucherModel.countDocuments({ eventId: request.eventId });
      }
    } catch(err) {
      return err;
    }
  }
}
