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

    let statusCode = 500;
    let stack: string | undefined;
    const sendData: any = {
      errorCode: 'ERR_000_0001',
      message: ERROR_CODE.ERR_000_0001,
      error: undefined,
    };

    if (exception instanceof ClientRequestException) {
      statusCode = exception.getStatus();
      stack = exception.stack;

      sendData.message = exception.getResponse();
      sendData.errorCode = this.getErrorCode(sendData.message);
      sendData.error = exception.value;

      if (sendData.error?.value) {
        sendData.message = format(sendData.message, sendData.error);
        sendData.error = undefined;
      }
    } else if (exception instanceof NotFoundException) {
      statusCode = 404;

      sendData.errorCode = 'ERR_000_0002';
      sendData.message = ERROR_CODE.ERR_000_0002;
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      stack = exception.stack;

      sendData.errorCode = 'ERR_000_0003';
      sendData.message = ERROR_CODE.ERR_000_0003;
      sendData.error = exception.getResponse();
    }

    // sentry가 켜져있고, 500번대 에러일 경우에만 sentry에 에러를 보낸다.
    if (config.useSentry && statusCode % 100 === 5) {
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
