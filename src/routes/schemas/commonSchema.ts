"use strict";
const Joi = require("joi");

export const PaginationSchema = Joi.object({
  keyword: Joi.string(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string(),
  sortDir: Joi.number()
});

export const ErrSchema = Joi.object({
  statusCode: Joi.string().description("HTTP status code"),
  error: Joi.string().description("Error type"),
  message: Joi.string().description("Error message")
}).label("Error");

export const ParamSchema = Joi.object({
  id: Joi.string().required()
});


export const DefaultResSchema = {
  200: {
    description: "Success",
    schema: Joi.object({
      statusCode: Joi.string().description("HTTP status code"),
      message: Joi.string().description("Message")
    })
  },
  400: {
    description: "Something wrong happened",
    schema: ErrSchema
  }
};

export const JwtSchema = Joi.object({
  "authorization": Joi.string().required()
}).unknown().label("Auth")
