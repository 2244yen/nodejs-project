"use strict";
import { ResponseToolkit } from "@hapi/hapi";
import UserService from "../services/userService";
import { UserCreateInterface, UserEditInterface, UserParamInterface, LoginInterface } from "../interfaces/userRequestInterface";
import { PaginationInterface } from "../interfaces/commonInterface";

export default class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
    this.view = this.view.bind(this);
    this.delete = this.delete.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  async authenticate(request: LoginInterface, h: ResponseToolkit) {
    const data = await this.userService.authenticate(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async index(request: PaginationInterface, h: ResponseToolkit) {
    const data = await this.userService.getList(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async create(request: UserCreateInterface, h: ResponseToolkit) {
    const data = await this.userService.createUser(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async edit(request: UserEditInterface, h: ResponseToolkit) {
    const data = await this.userService.editUser(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async view(request: UserParamInterface, h: ResponseToolkit) {
    const data = await this.userService.getUser(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async delete(request: UserParamInterface, h: ResponseToolkit) {
    const data = await this.userService.deleteUser(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }
}
