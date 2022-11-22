import { Request, Response } from 'express';
import Card from '../models/card';

import {
  INVALID_DATA_ERROR,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR,
  CustomRequest
} from '../utils/constants';

export const getCards = (_req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' }));
};

export const createCard = (req: CustomRequest, res: Response) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user && req.user._id,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INVALID_DATA_ERROR).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};

export const deleteCard = (req: Request, res: Response) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((cardInfo) => {
      if (!cardInfo) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Карточка по не найдена' });
      } else {
        res.send({ data: cardInfo });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INVALID_DATA_ERROR).send({ message: 'Карточка не найдена' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};

export const setLike = (req: CustomRequest, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user && req.user._id } },
    { new: true, runValidators: true },
  )
    .then((cardInfo) => {
      if (!cardInfo) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Карточка по не найдена' });
      } else {
        res.send({ data: cardInfo });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INVALID_DATA_ERROR).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'CastError') {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};

export const removeLike = (req: CustomRequest, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user && req.user._id } },
    { new: true, runValidators: true },
  )
    .then((cardInfo) => {
      if (!cardInfo) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Карточка по не найдена' });
      } else {
        res.send({ data: cardInfo });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INVALID_DATA_ERROR).send({ message: 'Запрашиваемый id некорректен' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};
