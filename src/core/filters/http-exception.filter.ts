import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

import * as sentry from '@sentry/node';
import { ConfigService } from '@nestjs/config';

interface IException {
  statusCode: number;
  timestamp: string;
  path: string;
  stack?: any;
  message: any;
  name?: string;
  body?: any;
}

interface IClassValidatorException {
  statusCode: number;
  error: string;
  message: string[];
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HttpExceptionFilter');
  constructor(private readonly configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    exception.initMessage();
    const ex: IException = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    };
    const NODE_ENV = this.configService.get('NODE_ENV');
    if (NODE_ENV !== 'production') {
      ex.stack = exception.stack;
      ex.name = exception.name;
    }
    // Only emit to Sentry exceptions that dont have code 4xx
    const sendToSentry =
      this.configService.get('SKIP_SENTRY') !== 'true' &&
      NODE_ENV !== 'testing' &&
      (status < 400 || status >= 500);

    if (sendToSentry) {
      sentry.captureException(exception);
    } else {
      this.logger.error('Catched');
      console.error(exception);
    }

    if (status === 400) {
      const classValidatorEx = exception.getResponse() as IClassValidatorException;
      ex.message = classValidatorEx.message;
      ex.name = classValidatorEx.error;
      ex.body = request.body;
    }

    response.status(status).send(ex);
  }
}
