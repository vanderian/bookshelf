import { getModelToken } from '@nestjs/mongoose';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass, serialize } from 'class-transformer';
import { Observable, of } from 'rxjs';
import { BookModule } from '../src/book/book.module';
import { BookService } from '../src/book/book.service';
import { BookDto } from '../src/book/model/book.dto';
import { BookQuery } from '../src/book/model/book.query';
import { BOOK_MODEL } from '../src/book/model/book.schema';
import { CoreModule } from '../src/core/core.module';
import { AppLogger } from '../src/core/logger/logger';

class MockService {
  public static MOCK_BOOK = plainToClass(BookDto, {
    title: 'title',
    description: 'desc',
    authors: ['aut1', 'aut2'],
  });

  findAll(bookQuery: BookQuery): Observable<BookDto[]> {
    return of([MockService.MOCK_BOOK]);
  }
}

describe('BookController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BookModule, CoreModule],
    })
      .overrideProvider(BookService)
      .useClass(MockService)
      .overrideProvider(getModelToken(BOOK_MODEL))
      .useValue({})
      .compile();

    const logger = new AppLogger();
    app = moduleFixture.createNestApplication(new FastifyAdapter(), {
      logger: logger,
    });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // sample e2e test
  it('/ (GET)', async () => {
    return app
      .inject({
        method: 'GET',
        url: '/',
      })
      .then(({ payload }) =>
        expect(payload).toBe(serialize([MockService.MOCK_BOOK])),
      );
  });
});
