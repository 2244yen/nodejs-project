import * as Boom from "@hapi/boom";

export default class Errors {
  constructor() {}

  static badRequest(message?: string) {
    return Boom.badRequest(message);
  }

  static unauthorized(message?: string) {
    return Boom.unauthorized(message);
  }

  static notFound(message?: string) {
    return Boom.notFound(message);
  }

  static badImplementation(message?: string) {
    return Boom.badImplementation(message);
  }

  static serverUnavailable(message?: string) {
    return Boom.serverUnavailable(message);
  }
}
