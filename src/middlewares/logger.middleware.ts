import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  use(req: any, res: any, next: () => void) {
    const url = new URL(req.originalUrl || '', `http://${req.headers.host}`);

    res.on('finish', () => {
      this.logger.info('HTTP request log', {
        url: url.href,
        method: req.method,
        'query parameters': url.searchParams,
        body: res.body,
        'status code': res?.statusCode,
      });
    });

    next();
  }
}
