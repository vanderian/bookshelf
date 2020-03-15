import { Document } from 'mongoose';

export interface Book extends Document {
  readonly title: string;
  readonly description: string;
  readonly authors: [string];
}
