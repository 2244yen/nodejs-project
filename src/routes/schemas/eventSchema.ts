"use strict";

const Joi = require("joi");
import { ErrSchema } from "./commonSchema";

export const EventSchema = Joi.object().keys({
  name: Joi.string().required(),
  qty: Joi.number().default(1).required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required()
}).required().label("Event");

export const EventParamSchema = Joi.object({
  eventId: Joi.string().required()
});

export const EventListResSchema =  {
  200: {
    description: "Success",
    schema: Joi.object({
      statusCode: Joi.number().integer().default(200),
      total: Joi.number().integer().default(0),
      page: Joi.number().integer().default(1),
      limit: Joi.number().integer().default(10),
      results: Joi.array().items(EventSchema)
    })
  },
  400: {
    description: "Something wrong happened",
    schema: ErrSchema
  }
}


export const EventResSchema = {
  200: {
    description: "Success",
    schema: Joi.object({
      result: EventSchema
    })
  },
  456: {
    description: "Something wrong happened",
    schema: ErrSchema
  }
}
