"use strict";
import { EventDocumentInterface } from "../models/eventModel";

export interface EventRequestInterface {
  params: {
    id?: String
  },
  payload: EventDocumentInterface
}

export interface EventParamInterface {
  params: {
    eventId: String
  }
}
