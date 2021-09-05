"use strict";

import HomeController from '../controllers/HomeController';

const homeCtrl = new HomeController();

export default [
  {
    method: "GET",
    path: "/",
    options: {
      auth: false,
      handler: homeCtrl.index
    }
  }
]