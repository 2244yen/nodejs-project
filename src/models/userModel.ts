'use strict';
import { Model, Schema, model } from 'mongoose';

interface UserDocumentInterface {
  fullName: String,
  userName: String,
  passWord: String,
  role: String,
  createdAt?: Date
}

export const userSchema = new Schema<UserDocumentInterface>({
  fullName: { type: String, required: true },
  userName: { type: String, required: true, index: { unique: true } },
  passWord: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const UserModel: Model<UserDocumentInterface> = model<UserDocumentInterface>("UserModel", userSchema);

export default UserModel;
