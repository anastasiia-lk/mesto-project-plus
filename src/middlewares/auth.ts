import { JwtPayload, verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import Unathorized from '../utils/errors/Unathorized';
import { CustomRequest } from '../app';

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unathorized('Требуется авторизация');
  }

  let payload;

  try {
    payload = verify(authorization!.replace('Bearer ', ''), 'super-strong-secret');
  } catch (err) {
    throw new Unathorized('Требуется авторизация');
  }

  req.user = payload as { _id: JwtPayload };
  next();
};
