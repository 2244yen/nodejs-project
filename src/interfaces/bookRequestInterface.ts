"use strict";

export interface BookRequestInterface {
  params: {
    id?: String
  },
  payload: {
    title: String,
    author: String,
    stock: Number,
    status?: String,
    images?: String,
    isbn?: String,
    numberOfCopies?: Number,
    pageCount?: Number,
    datePublished?: Date,
    createdBy?: String,
    createdAt?: Date,
    updatedAt?: Date
  }
}

export interface BookParamInterface {
  params: {
    id: String
  }
}
