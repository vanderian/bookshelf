import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule, Routes } from 'nest-router';
import { BookModule } from './book/book.module';
import { CoreModule } from './core/core.module';

const routes: Routes = [
  {
    path: '/v1/books',
    children: [BookModule],
  },
];

// configs or .env should be preferable
const DB_HOST = `${process.env.DB_HOST || 'localhost'}`;

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${DB_HOST}/nest`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    RouterModule.forRoutes(routes),
    CoreModule,
    BookModule,
  ],
})
export class AppModule {}
