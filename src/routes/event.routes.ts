"use strict";

import EventController from "../controllers/EventController";
import * as EventSchema from "./schemas/eventSchema";
import * as CommonSchema from "./schemas/commonSchema";

export default (() => {
  const eventCtrl = new EventController();

  return [
    {
      method: "GET",
      path: "/v1/events",
      options: {
        handler: eventCtrl.index,
        tags: ["api", "Event"],
        validate: {
          query: CommonSchema.PaginationSchema,
          headers: CommonSchema.JwtSchema
        },
        plugins: {
          'hapi-swagger': {
            responses: EventSchema.EventListResSchema
          }
        }
      }
    },
    {
      method: "GET",
      path: "/v1/events/{id}",
      options: {
        handler: eventCtrl.view,
        tags: ["api", "Event"],
        validate: {
          params: CommonSchema.ParamSchema,
          headers: CommonSchema.JwtSchema
        },
        plugins: {
          'hapi-swagger': {
            responses: EventSchema.EventResSchema
          }
        }
      }
    },
    {
      method: "POST",
      path: "/v1/events",
      options: {
        handler: eventCtrl.create,
        tags: ["api", "Event"],
        validate: {
          payload: EventSchema.EventSchema,
          headers: CommonSchema.JwtSchema
        },
        plugins: {
          'hapi-swagger': {
            responses: CommonSchema.DefaultResSchema
          }
        }
      }
    },
    {
      method: "PUT",
      path: "/v1/events/{id}",
      options: {
        handler: eventCtrl.edit,
        tags: ["api", "Event"],
        validate: {
          params: CommonSchema.ParamSchema,
          payload: EventSchema.EventSchema,
          headers: CommonSchema.JwtSchema
        },
        plugins: {
          'hapi-swagger': {
            responses: CommonSchema.DefaultResSchema
          }
        }
      }
    },
    {
      method: "DELETE",
      path: "/v1/events/{id}",
      options: {
        handler: eventCtrl.delete,
        tags: ["api", "Event"],
        validate: {
          params: CommonSchema.ParamSchema,
          headers: CommonSchema.JwtSchema
        },
        plugins: {
          'hapi-swagger': {
            responses: CommonSchema.DefaultResSchema
          }
        }
      }
    },
    {
      method: "POST",
      path: "/v1/promotions/{eventId}",
      options: {
        handler: eventCtrl.addVoucher,
        tags: ["api", "Event"],
        validate: {
          params: EventSchema.EventParamSchema,
          headers: CommonSchema.JwtSchema
        },
        plugins: {
          'hapi-swagger': {
            responses: CommonSchema.DefaultResSchema
          }
        }
      }
    }
  ]
})();