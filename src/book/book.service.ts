import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { ignoreElements, map } from 'rxjs/operators';
import { BookDto } from './model/book.dto';
import { Book } from './model/book.model';
import { BOOK_MODEL } from './model/book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(BOOK_MODEL) private bookModel: Model<Book>) {}

  addBook(addBook: BookDto) {
    const newBook = new this.bookModel(addBook);
    return from(newBook.save()).pipe(ignoreElements());
  }

  findAll(reqQuery: object): Observable<BookDto[]> {
    return from(this.bookModel.find().exec()).pipe(
      map(it => plainToClass(BookDto, it, { excludeExtraneousValues: true })),
    );
  }
}
