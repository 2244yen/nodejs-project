"use strict";
import { ResponseToolkit, Request } from "@hapi/hapi";
import VoucherService from "../services/voucherService";
import { VoucherIssueInterface } from "../interfaces/voucherRequestInterface";
import { PaginationInterface, ParamInterface } from "../interfaces/commonInterface";

export default class VoucherController {
  voucherService: VoucherService;

  constructor() {
    this.voucherService = new VoucherService();
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  async index(request: PaginationInterface, h: ResponseToolkit) {
    const data = await this.voucherService.index(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async create(request: VoucherIssueInterface, h: ResponseToolkit) {
    const data = await this.voucherService.create(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async delete(request: ParamInterface, h: ResponseToolkit) {
    const data = await this.voucherService.delete(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }
}
