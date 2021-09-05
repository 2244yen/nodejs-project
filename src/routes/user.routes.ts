"use strict";

import UserController from "../controllers/UserController";
import * as UserSchema from "./schemas/userSchema";
import * as CommonSchema from "./schemas/commonSchema";

export default (() => {
  const userCtrl = new UserController();

  return [
    {
      method: "POST",
      path: "/v1/authenticate",
      options: {
        auth: false,
        handler: userCtrl.authenticate,
        tags: ["api", "User"],
        validate: {
          payload: UserSchema.LoginSchema
        },
        plugins: {
          "hapi-swagger": {
            responses: UserSchema.LoginResSchema
          }
        }
      }
    },
    {
      method: "GET",
      path: "/v1/users",
      options: {
        auth: false,
        handler: userCtrl.index,
        tags: ["api", "User"],
        validate: {
          query: CommonSchema.PaginationSchema
        },
        plugins: {
          "hapi-swagger": {
            responses: UserSchema.UserListResSchema
          }
        }
      }
    },
    {
      method: "GET",
      path: "/v1/users/{id}",
      options: {
        handler: userCtrl.view,
        tags: ["api", "User"],
        validate: {
          params: UserSchema.UserParamSchema,
          headers: CommonSchema.JwtSchema
        },
        plugins: {
          "hapi-swagger": {
            responses: UserSchema.UserResSchema
          }
        }
      }
    },
    {
      method: "POST",
      path: "/v1/users",
      options: {
        auth: false,
        handler: userCtrl.create,
        tags: ["api", "User"],
        validate: {
          payload: UserSchema.UserCreateSchema
        },
        plugins: {
          "hapi-swagger": {
            responses: CommonSchema.DefaultResSchema
          }
        }
      }
    },
    {
      method: "PUT",
      path: "/v1/users/{id}",
      options: {
        handler: userCtrl.edit,
        tags: ["api", "User"],
        validate: {
          params: UserSchema.UserParamSchema,
          payload: UserSchema.UserCreateSchema,
          headers: CommonSchema.JwtSchema
        },
        plugins: {
          "hapi-swagger": {
            responses: CommonSchema.DefaultResSchema
          }
        }
      }
    },
    {
      method: "DELETE",
      path: "/v1/users/{id}",
      options: {
        handler: userCtrl.delete,
        tags: ["api", "User"],
        validate: {
          params: UserSchema.UserParamSchema,
          headers: CommonSchema.JwtSchema
        },
        plugins: {
          "hapi-swagger": {
            responses: CommonSchema.DefaultResSchema
          }
        }
      }
    }
  ]
})();