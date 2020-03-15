import { Injectable, NestMiddleware } from '@nestjs/common';
import { AppLogger } from './logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  constructor(private readonly logger: AppLogger) {
    logger.setContext('Request');
  }

  use(req: any, res: any, next: () => void) {
    this.logger.log(`Request...`);
    next();
  }
}
