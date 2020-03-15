import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppLogger } from './logger/logger';
import { LoggingInterceptor } from './logger/logging.interceptor';

@Module({
  providers: [
    AppLogger,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
  exports: [AppLogger],
})
export class CoreModule {}
