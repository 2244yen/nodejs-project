const jwt = require("jsonwebtoken");
import * as config from "../config/env.json";

export function createToken(data): String {
  return jwt.sign(data, config.JWT_TOKEN.privateKey, { algorithm: config.JWT_TOKEN.algorithm, expiresIn: '5h' });
};
