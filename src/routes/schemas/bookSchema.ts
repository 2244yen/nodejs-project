"use strict";
const Joi = require("joi");
// import JoiObjectId from "joi-objectid";
import { ErrSchema } from "./commonSchema";

const BookInfoSchema = Joi.object({
  _id: Joi.string(),
  title: Joi.string().min(1).required(),
  author: Joi.string().min(1).required(),
  stock: Joi.number().integer().default(0).required(),
  status: Joi.string().default("unavailable"),
  images: Joi.string(),
  isbn: Joi.string().length(10),
  numberOfCopies: Joi.number().integer().default(0),
  datePublished: Joi.date().iso(),
  pageCount: Joi.number(),
  createdBy: Joi.string(),
  updatedBy: Joi.string().min(1),
  createdAt: Joi.date().iso(),
  updatedAt: Joi.date().iso()
}).label("Book Info");

export const BookCreateSchema = Joi.object({
  title: Joi.string().min(1).required().error(() => "Invalid title").description("Book Title"),
  author: Joi.string().min(1).required(),
  stock: Joi.number().integer().default(0).required(),
  status: Joi.string().default("unavailable"),
  images: Joi.string().default(""),
  isbn: Joi.string().length(10),
  numberOfCopies: Joi.number().integer().default(0),
  datePublished: Joi.date().iso(),
  pageCount: Joi.number(),
  createdBy: Joi.string(),
}).required().label("Create Book")

export const BookEditSchema = Joi.object({
  title: Joi.string().min(1).required().error(() => "Invalid title").description("Book Title"),
  author: Joi.string().min(1).required(),
  stock: Joi.number().integer().default(0).required(),
  status: Joi.string().default("unavailable"),
  images: Joi.string().default(""),
  isbn: Joi.string().length(10),
  numberOfCopies: Joi.number().integer().default(0),
  datePublished: Joi.date().iso(),
  pageCount: Joi.number()
}).required().label("Edit Book")

export const BookParamSchema = Joi.object({
  id: Joi.string().required()
});


export const BookResSchema = {
  200: {
    description: "OK",
    schema: Joi.object({
      statusCode: Joi.number().integer().default(200),
      result: BookInfoSchema
    })
  },
  400: {
    description: "Something wrong happened",
    schema: ErrSchema
  }
}

export const BookListResSchema = {
  200: {
    description: "Success",
    schema: Joi.object({
      statusCode: Joi.number().integer().default(200),
      total: Joi.number().integer().default(0),
      page: Joi.number().integer().default(1),
      limit: Joi.number().integer().default(10),
      results: Joi.array().items(BookInfoSchema)
    })
  },
  400: {
    description: "Something wrong happened",
    schema: ErrSchema
  }
}
