"use strict";

const Joi = require("joi");
import { ErrSchema } from "./commonSchema";

export const UserCreateSchema = Joi.object().keys({
  fullName: Joi.string().required(),
  userName: Joi.string().min(2).max(30).required(),
  passWord: Joi.string().min(6).required().error(() => 'Invalid password'),
  role: Joi.string().required(),
}).required().label("Book Payload")

export const UserParamSchema = Joi.object({
  id: Joi.string().required()
});


export const UserResSchema = {
  200: {
    description: "Success",
    schema: Joi.object().keys({
      result: UserCreateSchema
    })
  },
  400: {
    description: "Something wrong happened",
    schema: ErrSchema
  }
}

export const UserListResSchema = {
  200: {
    description: "Success",
    schema: Joi.object().keys({
      statusCode: Joi.number().integer().default(200),
      total: Joi.number().integer().default(0),
      page: Joi.number().integer().default(1),
      limit: Joi.number().integer().default(10),
      results: Joi.array().items(UserCreateSchema)
    })
  },
  400: {
    description: "Something wrong happened",
    schema: ErrSchema
  }
}

export const LoginSchema = Joi.object().keys({
  userName: Joi.string().min(2).max(30).required().error(() => 'Invalid username'),
  passWord: Joi.string().min(6).required().error(() => 'Invalid password')
}).required().label("Authentication Payload")


export const LoginResSchema = {
  200: {
    description: "Success",
    schema: Joi.object().keys({
      statusCode: Joi.number().integer().default(200),
      token: Joi.string().required()
    })
  },
  400: {
    description: "Something wrong happened",
    schema: ErrSchema
  }
}

// const authenticateUserSchema = Joi.alternatives().try(
//   Joi.object({
//     username: Joi.string().alphanum().min(2).max(30).required(),
//     password: Joi.string().required()
//   }),
//   Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().required()
//   })
// );
