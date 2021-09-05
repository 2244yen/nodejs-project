'use strict';
import { Model, Schema, model } from 'mongoose';

interface BookDocumentInterface {
  title: String,
  author: String,
  stock: Number,
  status?: String,
  images?: String,
  isbn?: String,
  numberOfCopies?: Number,
  pageCount?: Number,
  datePublished?: Date,
  createdBy?: String,
  createdAt?: Date,
  updatedAt?: Date
}

export const bookSchema = new Schema<BookDocumentInterface>({
  title: { type: String, default: '', required: true },
  author: { type: String, default: '', required: true },
  stock: { type: Number, default: 0, required: true },
  status: { type: String, default: 'unavailable' },
  images: { type: String },
  isbn: { type: String, min: 10, max: 10 },
  numberOfCopies: { type: Number, default: 0 },
  pageCount: { type: Number, default: 0 },
  datePublished: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'UserModel' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const BookModel: Model<BookDocumentInterface> = model<BookDocumentInterface>("BookModel", bookSchema);

export default BookModel;
