import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CheckBookExistsPipe } from '../core/pipe/check-book-exists-pipe.service';
import { CheckBookNotFoundPipe } from '../core/pipe/check-book-not-found-pipe.service';
import { BookService } from './book.service';
import { BookDto } from './model/book.dto';
import { BookQuery } from './model/book.query';

@Controller('/')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll(@Query() bookQuery: BookQuery): Observable<BookDto[]> {
    return this.bookService.findAll(bookQuery);
  }

  @Post()
  @UsePipes(CheckBookExistsPipe)
  addBook(@Body() bookDto: BookDto) {
    return this.bookService.addBook(bookDto);
  }

  @Put()
  @UsePipes(CheckBookNotFoundPipe)
  editBook(@Body() bookDto: BookDto) {
    return this.bookService.editBook(bookDto);
  }

  @Delete()
  @UsePipes(CheckBookNotFoundPipe)
  deleteBook(@Body() bookDto: BookDto) {
    return this.bookService.deleteBook(bookDto);
  }
}
