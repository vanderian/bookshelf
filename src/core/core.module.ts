import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logger/logging.interceptor';
import { AppLogger } from './logger/logger';

@Module({
  providers: [
    AppLogger,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
  exports: [AppLogger],
})
export class CoreModule {}
