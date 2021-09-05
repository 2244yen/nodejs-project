"use strict";

import { Server } from "@hapi/hapi";
import { Agenda } from "agenda/es";

const register = async (server: Server, options: any) => {
  const agenda = new Agenda({ db: { address: options.db } });

  agenda.define("check connection", async (job, done) => {
    console.log('Server running on http://127.0.0.1:3000')
    done()
  });

  agenda.on('fail', function (err: any, job: any) {
    server.log(['agenda', 'error'], { err: err, job: job.attrs });
  });

  await agenda.start();
  await agenda.every("3 minutes", "check connection");
}

const name = "hapi-agenda";
const version = "1.0.0";

export default { register, name, version }