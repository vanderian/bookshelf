import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { serialize } from 'class-transformer';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppLogger } from './logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const { statusCode } = context.switchToHttp().getResponse();
    const ctx = `${request.raw.method} ${request.raw.url}`;
    this.logger.debug(
      `p:${JSON.stringify(request.params)}` +
      ` q:${JSON.stringify(request.query)}` +
      ` b:${JSON.stringify(request.body)}`,
      ctx,
    );

    const now = Date.now();
    return next.handle().pipe(
      tap(
        it => this.logger.debug(`${serialize(it)}`, ctx),
        err => this.logger.error(err.message, err.stack, ctx),
        () => this.logger.log(`${statusCode} ${Date.now() - now}ms`, ctx)),
    );
  }
}
