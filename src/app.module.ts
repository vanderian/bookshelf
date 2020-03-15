import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule, Routes } from 'nest-router';
import { BookModule } from './book/book.module';
import { CoreModule } from './core/core.module';

const routes: Routes = [
  {
    path: '/v1/book',
    children: [BookModule],
  },
];

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    RouterModule.forRoutes(routes),
    CoreModule,
    BookModule,
  ],
})
export class AppModule {}
