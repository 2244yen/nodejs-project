"use strict";

import { Server } from "@hapi/hapi";
const path = require("path");
const glob = require("glob");

export function initRoutes(server: Server) {
  ['*routes.js', '*routes.ts'].forEach((type: string) => {
    glob.sync(path.join(__dirname, `../routes/**/${type}`)).forEach((file: string) => {
      const route:any = require(path.resolve(file)).default;
      server.route(route);
    });
  });

  server.route({
    method: '*',
    path: '/{any*}',
    handler: function (request, h) {
      return '404 Error! Page Not Found!';
    }
  });
}
