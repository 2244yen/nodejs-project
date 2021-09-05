import UserModel from "../models/userModel";
import logger from "../utils/logger";
import Errors from "../utils/errors";
import { UserCreateInterface, UserEditInterface, UserParamInterface, LoginInterface } from "../interfaces/userRequestInterface";
import { PaginationInterface } from "../interfaces/commonInterface";
import { createToken } from "../utils/token";
const bcrypt = require("bcrypt");

export default class UserService {
  constructor() {}

  async authenticate(request: LoginInterface): Promise<any> {
    try {
      const { userName, passWord } = request.payload;
      const exsistedUser = await UserModel.findOne({ userName }).exec();
      if (!exsistedUser) {
        return Errors.badRequest('Invalid username');
      }
      const validPassword = await bcrypt.compare(passWord, exsistedUser.passWord);
      if (validPassword) {
        return {
          statusCode: 200,
          token: createToken({ userName, role: exsistedUser.role })
        }
      } else {
        return Errors.badRequest('Invalid password');
      }
    } catch (err) {
      logger.error(err);
      return Errors.badImplementation();
    }
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
            {userName: {$regex: "(?i)" + keyword}},
            {fullName: {$regex: "(?i)" + keyword}}
          ]
        });
      }
      
      const data = await UserModel.find(query, null, condition).exec();
      if (!data) {
        return Errors.notFound();
      }
      const total = await UserModel.countDocuments(query);
      logger.info('[Fetch][Users] successfully' + total);
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

  async createUser(request: UserCreateInterface): Promise<any> {
    try {
      const { userName, passWord, fullName, role } = request.payload;
      const exsistedUser = await UserModel.findOne({ userName }).exec();
      if (exsistedUser) {
        return Errors.badRequest('userName is exsisted');
      }
      const payload:any = { userName, fullName, role };
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      payload.passWord = await bcrypt.hash(passWord, salt);
      const result = await new UserModel(payload).save();
      logger.info('[Created][Users] successfully');

      return {
        statusCode: 200,
        result
      };
    } catch(error) {
      logger.error(error);
      return Errors.badImplementation();
    }
  }

  async getUser(request: UserParamInterface): Promise<any> {
    try {
      const result = await UserModel.findById(request.params.id).exec();
      if (!result) {
        return Errors.notFound();
      }
      logger.info('[View][Users] successfully');
      return {
        statusCode: 200,
        result
      };
    } catch(error) {
      logger.error(error);
      return Errors.badImplementation();
    }
  }

  async editUser(request: UserEditInterface): Promise<any> {
    try {
      const data = await UserModel.findByIdAndUpdate(request.params.id, request.payload, { new: true });
      if (!data) {
        logger.error('[Update][Users] not update');
        return Errors.badRequest();
      }
      logger.info('[Update][Users] successfully');
      return {
        statusCode: 200,
        message: `${request.params.id} was updated.`
      };
    } catch(error) {
      logger.error(error);
      return Errors.badImplementation();
    }
  }

  async deleteUser(request: UserParamInterface): Promise<any> {
    try {
      const data = await UserModel.findByIdAndDelete(request.params.id).exec();
      if (!data) {
        logger.error('[Delete][Users] not delete');
        return Errors.badRequest();
      }
      logger.info(`[Delete][Users] ${request.params.id} was deleted.`);
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
