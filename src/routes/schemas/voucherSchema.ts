"use strict";

const Joi = require("joi");
import { ErrSchema } from "./commonSchema";

export const VoucherSchema = Joi.object().keys({
  code: Joi.string().required(),
  eventId: Joi.string(),
  issuedDate: Joi.date().iso().required(),
  active: Joi.boolean()
}).required().label("Voucher")

export const VoucherResSchema = {
  200: {
    description: "OK",
    schema: Joi.object({
      result: VoucherSchema
    })
  },
  456: {
    description: "Something wrong happened",
    schema: ErrSchema
  }
}

export const VoucherListResSchema = {
  200: {
    description: "Success",
    schema: Joi.object({
      statusCode: Joi.number().integer().default(200),
      total: Joi.number().integer().default(0),
      page: Joi.number().integer().default(1),
      limit: Joi.number().integer().default(10),
      results: Joi.array().items(VoucherSchema)
    })
  },
  400: {
    description: "Something wrong happened",
    schema: ErrSchema
  }
}
