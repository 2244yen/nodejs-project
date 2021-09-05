"use strict";

import * as Hapi from "@hapi/hapi";
import * as config from "../config/env.json";
import { initRoutes } from "./routes";
import { initPlugins } from "./plugins";
import { initDb } from "./database";
import JwtConfig from "./jwt";

const init = async () => {
  const server = Hapi.server({
    port: config.APP_PORT,
    host: config.APP_HOST
  });
  
  await server.register(require("hapi-auth-jwt2"));
  server.auth.strategy("jwt", "jwt", JwtConfig);
  server.auth.default("jwt"); // so JWT auth is required for all routes

  initRoutes(server);
  await initPlugins(server);
  await initDb();

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init().catch(err => console.log(err));

require("./pull");
