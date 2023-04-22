import * as jwt from 'jsonwebtoken';
import { ClientRequestException } from './exceptions/request.exception';
import ERROR_CODE from './exceptions/error-code';
import { HttpStatus } from '@nestjs/common';
import { JwtUserPayload } from './app.interface';
import { config } from './config/config.service';

export const jwtAccessTokenSign = async (payload: string | object | Buffer): Promise<string> => {
  try {
    return await jwt.sign(payload, config.jwtSecretKey, { expiresIn: '30m' });
  } catch (e) {
    throw new ClientRequestException(ERROR_CODE.ERR_000_0001, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const jwtRefreshTokenSign = async (payload: string | object | Buffer): Promise<string> => {
  try {
    return await jwt.sign(payload, config.jwtSecretKey, { expiresIn: '30d' });
  } catch (e) {
    throw new ClientRequestException(ERROR_CODE.ERR_000_0001, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const jwtVerify = async (token: string): Promise<JwtUserPayload | undefined> => {
  try {
    return (await jwt.verify(token, config.jwtSecretKey)) as JwtUserPayload;
  } catch (e) {
    if (e instanceof Error) {
      switch (e.message) {
        case 'jwt expired':
          throw new ClientRequestException(ERROR_CODE.ERR_002_0006, HttpStatus.UNAUTHORIZED);
        case 'invalid token':
          throw new ClientRequestException(ERROR_CODE.ERR_002_0005, HttpStatus.UNAUTHORIZED);
        case 'invalid signature':
          throw new ClientRequestException(ERROR_CODE.ERR_002_0007, HttpStatus.UNAUTHORIZED);
        default:
          throw new ClientRequestException(ERROR_CODE.ERR_000_0001, HttpStatus.INTERNAL_SERVER_ERROR, e);
      }
    }
  }
};

export const jwtTokenTimeLeft = async (payload: JwtUserPayload): Promise<number> => {
  if (!payload.exp) {
    throw new ClientRequestException(ERROR_CODE.ERR_000_0001, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  return payload.exp - Date.now() / 1000;
};
