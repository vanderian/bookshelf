import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { BookModule } from './book/book.module';
import { CoreModule } from './core/core.module';
import { LoggerMiddleware } from './core/logger/logging.middleware';

const routes: Routes = [{
  path: '/api/v1',
  children: [BookModule],
}];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    CoreModule,
    BookModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('');
  }
}
