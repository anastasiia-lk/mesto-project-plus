import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import {
  CustomRequest,
} from '../utils/types';
import NotFound from '../utils/errors/NotFound';
import BadReq from '../utils/errors/BadReq';
import Duplicate from '../utils/errors/Duplicate';

const { JWT_SECRET = 'super-strong-secret' } = process.env;

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.id)
    .then((userInfo) => {
      if (!userInfo) {
        throw new NotFound('Пользователь не найден');
      } else {
        res.send({ data: userInfo });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadReq('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Duplicate('Пользователь с выбранным e-mail уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadReq('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

export const updateUser = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user && req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((userInfo) => {
      if (!userInfo) {
        throw new NotFound('Пользователь не найден');
      } else {
        res.send({ data: userInfo });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReq('Переданы некорректные данные'));
      } else if (err.name === 'CastError') {
        next(new BadReq('Пользователь не найден'));
      } else {
        next(err);
      }
    });
};

export const updateAvatar = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user && req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((setAvatar) => {
      if (!setAvatar) {
        throw new NotFound('Пользователь не найден');
      } else {
        res.send({ data: setAvatar });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReq('Переданы некорректные данные'));
      } else if (err.name === 'CastError') {
        next(new BadReq('Пользователь не найден'));
      } else {
        next(err);
      }
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCred(email, password)
    .then((user) => {
      res
        .send({
          token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }),
        });
    })
    .catch(next);
};

export const getCurrentUser = (req: CustomRequest, res: Response, next: NextFunction) => {
  User.findById(req.user && req.user._id)
    .then((userInfo) => {
      if (!userInfo) {
        throw new NotFound('Пользователь не найден');
      } else {
        res.send({ data: userInfo });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadReq('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
