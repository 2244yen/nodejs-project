"use strict";
import { ResponseToolkit } from "@hapi/hapi";
import EventService from "../services/eventService";
import { EventRequestInterface, EventParamInterface } from "../interfaces/eventRequestInterface";
import { PaginationInterface, ParamInterface } from "../interfaces/commonInterface";

export default class EventController {
  eventService: EventService;

  constructor() {
    this.eventService = new EventService();
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
    this.view = this.view.bind(this);
    this.delete = this.delete.bind(this);
    this.addVoucher = this.addVoucher.bind(this);
  }

  async index(request: PaginationInterface, h: ResponseToolkit) {
    const data = await this.eventService.getList(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async create(request: EventRequestInterface, h: ResponseToolkit) {
    const data = await this.eventService.create(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async edit(request: EventRequestInterface, h: ResponseToolkit) {
    const data = await this.eventService.edit(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async view(request: ParamInterface, h: ResponseToolkit) {
    const data = await this.eventService.get(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async delete(request: ParamInterface, h: ResponseToolkit) {
    const data = await this.eventService.delete(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }

  async addVoucher(request: EventParamInterface, h: ResponseToolkit) {
    const data = await this.eventService.addVoucher(request);
    if (data.statusCode === 200) return h.response(data).code(200);
    throw data
  }
}
