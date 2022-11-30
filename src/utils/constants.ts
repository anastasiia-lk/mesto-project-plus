import { Request } from 'express';

export const INVALID_DATA_ERROR = 400;

export const ERROR_AUTH = 401;

export const NOT_ALLOWED_ERROR = 403;

export const NOT_FOUND_ERROR = 404;

export const DUPLICATE_ERROR = 409;

export const DEFAULT_ERROR = 500;

export interface CustomRequest extends Request {
  user?: {
    _id: string
  }
}
