import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { RequestExtras } from './interceptors/request-extras';

export interface IRequestAugmented extends Request {
  extras: RequestExtras;
}

export interface IRequestLocation {
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
}

export interface IRequestExtraData {
  payload?: JwtUserPayload;
  // user?: UserEntity;
}

export interface JwtUserPayload extends JwtPayload {
  idx: number;
  name: string;
}
