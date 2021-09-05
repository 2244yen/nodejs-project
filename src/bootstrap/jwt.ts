"use strict";
import UserModel from "../models/userModel";
import { ResponseToolkit, Request } from "@hapi/hapi";
import * as config from "../config/env.json";

const validate = async (decoded, request: Request, h: ResponseToolkit) => {
  const { userName } = decoded;
  const exsistedUser = await UserModel.findOne({ userName }).exec();
  if (exsistedUser) {
    return { isValid: true, credentials: decoded };
  } else {
    return { isValid: false }
  }
};

const JwtConfig = { 
  key: config.JWT_TOKEN.privateKey,
  validate,
  verifyOptions: { algorithms: [ 'HS256' ] }
};

export default JwtConfig