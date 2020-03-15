import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { ignoreElements, map } from 'rxjs/operators';
import { BookDto } from './model/book.dto';
import { Book } from './model/book.model';
import { BookQuery } from './model/book.query';
import { BOOK_MODEL } from './model/book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(BOOK_MODEL) private bookModel: Model<Book>) {}

  addBook(addBook: BookDto) {
    const newBook = new this.bookModel(addBook);
    return from(newBook.save()).pipe(ignoreElements());
  }

  findAll(bookQuery: BookQuery): Observable<BookDto[]> {
    let condition = {};
    if (bookQuery.searchQuery) {
      condition = { $text: { $search: bookQuery.searchQuery } };
    }
    const query = this.bookModel
      .find(condition)
      .skip(bookQuery.offset)
      .limit(bookQuery.limit);

    return from(query.exec()).pipe(
      map(it => plainToClass(BookDto, it, { excludeExtraneousValues: true })),
    );
  }

  editBook(bookDto: BookDto) {
    const q = this.bookModel.updateOne(bookDto.getIdQuery(), bookDto);
    return from(q.exec()).pipe(ignoreElements());
  }

  deleteBook(bookDto: BookDto) {
    const q = this.bookModel.deleteOne(bookDto.getIdQuery());
    return from(q.exec()).pipe(ignoreElements());
  }
}
