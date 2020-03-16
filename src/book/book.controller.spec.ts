import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookDto } from './model/book.dto';
import { BookQuery } from './model/book.query';
import { BOOK_MODEL } from './model/book.schema';

describe('BookController', () => {
  let bookController: BookController;
  let bookService: BookService;

  const mockTokens = [
    {
      provide: getModelToken(BOOK_MODEL),
      useValue: {},
    },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        BookService,
        ...mockTokens,
      ],
    }).compile();

    bookController = app.get(BookController);
    bookService = app.get(BookService);
  });

  // check contract sample test...
  describe('findAll', () => {
    it('should return a list of books', (done: (arg?: any) => void) => {
      const result = [new BookDto()];
      const q = new BookQuery();
      jest.spyOn(bookService, 'findAll').mockImplementation(() => of(result));

      bookController.findAll(q).subscribe(
        it => expect(it).toBe(result),
        err => done(err),
        () => done(),
      );
    });
  });
});
