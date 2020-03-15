import * as mongoose from 'mongoose';

export const BOOK_MODEL = 'Book';

export const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  authors: { type: [String] },
});
