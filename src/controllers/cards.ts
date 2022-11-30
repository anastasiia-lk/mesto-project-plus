import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import NotFound from '../utils/errors/NotFound';
import NotAllowed from '../utils/errors/NotAllowed';
import BadReq from '../utils/errors/BadReq';

import {
  INVALID_DATA_ERROR,
  DEFAULT_ERROR,
  CustomRequest,
} from '../utils/constants';

export const getCards = (_req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

export const createCard = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user && req.user._id,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReq('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

export const deleteCard = (req: CustomRequest, res: Response, next: NextFunction) => {
  Card.findById(req.params.cardId)
    .then((cardInfo) => {
      if (!cardInfo) {
        throw new NotFound('Карточка не найдена');
      } else if (req.user && req.user._id && cardInfo.owner.toString() !== req.user._id) {
        throw new NotAllowed('Недостаточно прав для удаления');
      } else {
        Card.deleteOne({ _id: req.params.cardId })
          .then(() => {
            res.send({ message: 'Успешно' });
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INVALID_DATA_ERROR).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};

export const setLike = (req: CustomRequest, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user && req.user._id } },
    { new: true },
  )
    .then((cardInfo) => {
      if (!cardInfo) {
        throw new NotFound('Карточка не найдена');
      } else {
        res.send({ data: cardInfo });
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

export const removeLike = (req: CustomRequest, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user && req.user._id } },
    { new: true },
  )
    .then((cardInfo) => {
      if (!cardInfo) {
        throw new NotFound('Карточка не найдена');
      } else {
        res.send({ data: cardInfo });
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
