"use strict";

import BookController from "../controllers/BookController";
import * as BookSchema from "./schemas/bookSchema";
import * as CommonSchema from "./schemas/commonSchema";

export default (() => {
  const bookCtrl = new BookController();

  return [
    {
      method: "GET",
      path: "/v1/books",
      options: {
        // auth: 'jwt',
        // pre: [
        //   { method: verifyCredentials, assign: 'user' }
        // ],
        handler: bookCtrl.index,
        tags: ["api", "Book"],
        validate: {
          query: CommonSchema.PaginationSchema,
          headers: CommonSchema.JwtSchema
        },
        plugins: {
          'hapi-swagger': {
            responses: BookSchema.BookListResSchema
          }
        }
      }
    },
    {
      method: "GET",
      path: "/v1/books/{id}",
      options: {
        handler: bookCtrl.view,
        tags: ["api", "Book"],
        validate: {
          params: BookSchema.BookParamSchema,
          headers: CommonSchema.JwtSchema
        },
        plugins: {
          'hapi-swagger': {
            responses: BookSchema.BookResSchema
          }
        }
      }
    },
    {
      method: "POST",
      path: "/v1/books",
      options: {
        handler: bookCtrl.create,
        tags: ["api", "Book"],
        validate: {
          payload: BookSchema.BookCreateSchema,
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
      path: "/v1/books/{id}",
      options: {
        handler: bookCtrl.edit,
        tags: ["api", "Book"],
        validate: {
          params: BookSchema.BookParamSchema,
          payload: BookSchema.BookEditSchema,
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
      path: "/v1/books/{id}",
      options: {
        handler: bookCtrl.delete,
        tags: ["api", "Book"],
        validate: {
          params: BookSchema.BookParamSchema,
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