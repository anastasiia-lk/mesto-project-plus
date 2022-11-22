import { Request, Response } from 'express';
import User from '../models/user';
import {
  INVALID_DATA_ERROR,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR,
  CustomRequest,
} from '../utils/constants';

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' }));
};

export const getUser = (req: Request, res: Response) => {
  User.findById(req.params.id)
    .then((userInfo) => {
      if (!userInfo) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ data: userInfo });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INVALID_DATA_ERROR).send({ message: 'Запрашиваемый id некорректен' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INVALID_DATA_ERROR).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};

export const updateUser = (req: CustomRequest, res: Response) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user && req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((userInfo) => {
      if (!userInfo) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ data: userInfo });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INVALID_DATA_ERROR).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'CastError') {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};

export const updateAvatar = (req: CustomRequest, res: Response) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user && req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((setAvatar) => {
      if (!setAvatar) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ data: setAvatar });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INVALID_DATA_ERROR).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'CastError') {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};
