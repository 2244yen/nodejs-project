"use strict";
import { ResponseToolkit } from "@hapi/hapi";
import BookService from "../services/BookService";
import { BookRequestInterface, BookParamInterface } from "../interfaces/bookRequestInterface";
import { PaginationInterface } from "../interfaces/commonInterface";

export default class BookController {
  bookService: BookService;

  constructor() {
    this.bookService = new BookService();
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
    this.view = this.view.bind(this);
    this.delete = this.delete.bind(this);
  }

  async index(request: PaginationInterface, h: ResponseToolkit) {
    const data = await this.bookService.getList(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async create(request: BookRequestInterface, h: ResponseToolkit) {
    const data = await this.bookService.createBook(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async edit(request: BookRequestInterface, h: ResponseToolkit) {
    const data = await this.bookService.editBook(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async view(request: BookParamInterface, h: ResponseToolkit) {
    const data = await this.bookService.getBook(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async delete(request: BookParamInterface, h: ResponseToolkit) {
    const data = await this.bookService.deleteBook(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }
}
