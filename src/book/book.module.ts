import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BOOK_MODEL, BookSchema } from './model/book.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: BOOK_MODEL, schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
