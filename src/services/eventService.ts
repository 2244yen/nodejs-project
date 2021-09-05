import EventModel from "../models/eventModel";
import VoucherService from "../services/voucherService";
import logger from "../utils/logger";
import Errors from "../utils/errors";
import { EventRequestInterface, EventParamInterface } from "../interfaces/eventRequestInterface";
import { PaginationInterface, ParamInterface } from "../interfaces/commonInterface";
import { generateVoucher, sleep } from "../utils/generate";
import * as mongoose from "mongoose";
const assert = require("assert");

export default class EventService {
  voucherService: VoucherService;
  constructor() {
    this.voucherService = new VoucherService();
  }

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
            { name: { $regex: "(?i)" + keyword } }
          ]
        });
      }

      const data = await EventModel.find(query, null, condition).exec();
      if (!data) {
        return Errors.notFound();
      }
      const total = await EventModel.countDocuments(query);
      logger.info('[Fetch][Events] successfully');
      return {
        statusCode: 200,
        total,
        page,
        limit,
        results: [...data]
      };
    } catch (err) {
      logger.error(err);
      return Errors.badImplementation();
    }
  }

  async create(request: EventRequestInterface): Promise<any> {
    try {
      const result = await new EventModel(request.payload).save()
      logger.info('[Create][Events] successfully');
      return {
        statusCode: 200,
        result
      };
    } catch (error) {
      logger.error(error);
      return Errors.badImplementation();
    }
  }

  async get(request: ParamInterface): Promise<any> {
    try {
      const result = await EventModel.findById(request.params.id).exec();
      if (!result) {
        return Errors.notFound();
      }
      logger.info('[View][Events] successfully');
      return {
        statusCode: 200,
        result
      };
    } catch (error) {
      logger.error(error);
      return Errors.badImplementation();
    }
  }

  async edit(request: EventRequestInterface): Promise<any> {
    try {
      const payload: any = { ...request.payload, updatedAt: new Date().toISOString() }
      const data = await EventModel.findByIdAndUpdate(request.params.id, payload, { new: true });
      if (!data) {
        logger.error('[Update][Events] Can not update');
        return Errors.badRequest();
      }
      logger.info('[Update][Events] successfully');
      return {
        statusCode: 200,
        message: `${request.params.id} was updated.`
      };
    } catch (error) {
      logger.error(error);
      return Errors.badImplementation();
    }
  }

  async delete(request: ParamInterface): Promise<any> {
    try {
      const data = await EventModel.findByIdAndDelete(request.params.id).exec();
      if (!data) {
        logger.error('[Delete][Events] Can not delete');
        return Errors.badRequest();
      }
      logger.info(`[Delete][Events] ${request.params.id} was deleted.`);
      return {
        statusCode: 200,
        message: `${request.params.id} was deleted.`
      };
    } catch (error) {
      logger.error(error);
      return Errors.badImplementation();
    }
  }

  async addVoucher(request: EventParamInterface): Promise<any> {
    try {
      const transactionOptions: any = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: "majority", wtimeout: 1000 }
      };
      const session = await EventModel.startSession();
      session.startTransaction(transactionOptions);

      const eventId = request.params.eventId;
      const doc = await EventModel.findOneAndUpdate(
        { _id: request.params.eventId, status: 'new' },
        {
          $inc: { qty: -1 }
        },
        { upsert: true, new: true, session: session }
      );

      if (!doc) return Errors.notFound();
  
      if (doc.qty < 0) return Errors.badRequest('Out of max quantity');

      let newVoucher = null;
      try {
        const voucherPayload = {
          code: generateVoucher(),
          eventId,
          issuedDate: new Date().toISOString(),
          active: true
        };
        const data = await this.voucherService.issue({ payload: voucherPayload }, session)
        
        const countVoucher = await this.voucherService.countByEvent({ eventId }, session);
        console.log(countVoucher)

        newVoucher = data;
        await session.commitTransaction();

      } catch (error) {
        logger.error('1111' + error);
        await session.abortTransaction();
      }
      session.endSession();

      return {
        statusCode: 200,
        result: newVoucher
      };
    } catch (error) {
      logger.error(error);
      return Errors.badImplementation();
    }
  }

  async addVoucher1(request: EventParamInterface): Promise<any> {
    try {
      const transactionOptions: any = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: "majority", wtimeout: 1000 }
      };
      const session = await EventModel.startSession();
      session.startTransaction(transactionOptions);

      const eventId = request.params.eventId;
      const result = await EventModel.findById(request.params.eventId).session(session).exec();
      if (!result || result.status === 'closed') return Errors.notFound();
      if (result.qty < 0) return Errors.badRequest('Out of max quantity');
      
      const countVoucher = await this.voucherService.countByEvent({ eventId }, session);
      console.log('Number ' + countVoucher);
      if (countVoucher >= result.qty) return Errors.badRequest('Out of max quantity');

      let newVoucher = null;
      try {
        const voucherPayload = {
          code: generateVoucher(),
          eventId,
          issuedDate: new Date().toISOString(),
          active: true
        };
        const data = await this.voucherService.issue({ payload: voucherPayload }, session)
        
        const countVoucher1 = await this.voucherService.countByEvent({ eventId }, session);
        console.log(countVoucher1)
        await sleep(5000);
        if (countVoucher > result.qty) {
          await session.abortTransaction();
          return Errors.badRequest('Out of max quantity');
        }

        newVoucher = data;
        await session.commitTransaction();

      } catch (error) {
        logger.error(error);
        await session.abortTransaction();
      }
      session.endSession();

      return {
        statusCode: 200,
        result: newVoucher
      };
    } catch (error) {
      logger.error(error);
      return Errors.badImplementation();
    }
  }
}
