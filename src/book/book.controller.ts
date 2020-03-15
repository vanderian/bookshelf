import { Body, Controller, Delete, Get, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BookService } from './book.service';
import { AddBookDto } from './model/add-book.dto';
import { Book } from './model/book.model';

@Controller("/")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll(@Query() reqQuery): Observable<Book[]> {
    return this.bookService.findAll(reqQuery);
  }

  @Post()
  addBook(@Body() addBook: AddBookDto) {
    return this.bookService.addBook(addBook);
  }

/*
  @Get('/:bookId')
  findBook(@Req() request): Observable<Book> {
    return request.book;
  }

  @Put('/:bookId')
  editBook(@Req() request): Observable<Book> {
    return this.bookService.editBook(request.body, request.book);
  }

  @Patch('/:bookId')
  patchBook(@Req() request): Observable<Book> {
    if (request.body._id) {
      delete request.body._id;
    }
    return this.bookService.editBook(request.body, request.book);
  }

  @Delete('/:bookId')
  deleteBook(@Req() request): Observable<string> {
    return this.bookService.deleteBook(request.book);
  }
*/
}
