import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AddBookDto } from './model/add-book.dto';
import { Book } from './model/book.model';

@Injectable()
export class BookService {
  private books = [];

  addBook(addBook: AddBookDto) {
    this.books.push(addBook);
  }

  findAll(reqQuery: object): Observable<Book[]> {
    return of(this.books);
  }
}
