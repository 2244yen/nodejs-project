"use strict";
import { Model, Schema, model } from "mongoose";

export interface VoucherDocumentInterface {
  code: String,
  eventId: String,
  issuedDate: Date,
  active: Boolean
}

export const voucherSchema = new Schema<VoucherDocumentInterface>({
  code: { type: String, required: true, index: { unique: true } },
  eventId: { type: Schema.Types.ObjectId, ref: "EventModel" },
  issuedDate: { type: Date, default: Date.now, required: true },
  active: { type: Boolean, default: false }
});

const voucherModel: Model<VoucherDocumentInterface> = model<VoucherDocumentInterface>("VoucherModel", voucherSchema);

// voucherModel.save(function (err) {
//   if (err) {
//   if (err.name === ‘MongoError’ && err.code === 11000) {
//   // Duplicate code detected
//   isExistDiscount = true;
// }

export default voucherModel;
