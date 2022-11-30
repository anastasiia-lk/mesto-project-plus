import { Request, Response, NextFunction } from 'express';
import { DEFAULT_ERROR } from '../utils/constants';

export default (
  err: { statusCode: number, message: string },
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = DEFAULT_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === DEFAULT_ERROR
        ? 'Ошибка сервера'
        : message,
    });
  next();
};
