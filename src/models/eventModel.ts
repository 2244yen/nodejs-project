"use strict";
import { Model, Schema, model } from "mongoose";

export interface EventDocumentInterface {
  name: String,
  qty: Number,
  startDate: Date,
  expiredDate: Date,
  status: String,
  createdAt?: Date
}

export const eventSchema = new Schema<EventDocumentInterface>({
  name: { type: String, required: true },
  qty: { type: Number, default: 1, required: true },
  startDate: { type: Date, default: Date.now, required: true },
  expiredDate: { type: Date, default: Date.now, required: true },
  status: { type: String, default: "new" },
  createdAt: { type: Date, default: Date.now }
});

const eventModel: Model<EventDocumentInterface> = model<EventDocumentInterface>("EventModel", eventSchema);

export default eventModel;
