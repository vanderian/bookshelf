import * as mongoose from 'mongoose';

export const BOOK_MODEL = 'Book';

export const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: { type: 'text' },
  },
  description: { type: String, index: { type: 'text' } },
  authors: { type: [String], index: { type: 'text' } },
});
