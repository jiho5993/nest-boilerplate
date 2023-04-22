import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { ClientRequestException } from '../exceptions/request.exception';
import format from 'string-format';
import ERROR_CODE from '../exceptions/error-code';
import errorMessage from '../exceptions/error-code/message';
import { SentryService } from '../sentry/sentry.service';
import { config } from '../config/config.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly sentryService: SentryService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const statusCode = 500; // let
    let stack: string | undefined;
    const sendData: any = {
      errorCode: 'ERR_000_0001',
      message: ERROR_CODE.ERR_000_0001,
      error: undefined,
    };

    if (config.useSentry && statusCode === 500) {
      this.sentryService.sendError(sendData, stack);
    }

    return res.status(statusCode).json(sendData);
  }

  getErrorCode(message: string): string {
    const errorCodes = Object.keys(errorMessage);
    const result = errorCodes.find((code) => ERROR_CODE[code] === message);
    if (result) {
      return result;
    }
    throw new ClientRequestException(ERROR_CODE.ERR_000_0001, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
