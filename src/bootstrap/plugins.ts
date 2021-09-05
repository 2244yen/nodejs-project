"use strict";

import * as Hapi from "@hapi/hapi";
import * as HapiSwagger from "hapi-swagger";
import * as config from "../config/env.json";
import Agenda from "./job";
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const Pack = require("../../package.json");

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: "Test API Documentation",
    version: Pack.version,
  },
  grouping: "tags"
};

const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
  {
    plugin: Inert
  },
  {
    plugin: Vision
  },
  {
    plugin: HapiSwagger,
    options: swaggerOptions
  },
  {
    plugin: Agenda,
    options: {
      db: config.DB_URI
    }
  }
]
export async function initPlugins(server: Hapi.Server):Promise<any> {
  await server.register(plugins);
}
