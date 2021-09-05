"use strict";

import * as mongoose from "mongoose";
import * as config from "../config/env.json";

export async function initDb() {
  await mongoose.connect(config.DB_URI, config.DB_OPTS);

  mongoose.connection.on("open", err => {
    if (err) throw err;
    console.log(`DB connected`);
  })

  mongoose.connection.on('error', err => {
    console.log('DB connection ' + err);
  });

}
