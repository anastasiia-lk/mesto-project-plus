import { Request, Response } from 'express';
import Card from '../models/card';
import { INVALID_DATA_ERROR, NOT_FOUND_ERROR, DEFAULT_ERROR } from '../utils/constants';

export interface CustomRequest extends Request {
  user?: {
    _id: string
  }
}

export const getCards = (_req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

export const createCard = (req: CustomRequest, res: Response) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.send(card))
    .catch((err) => res.status(INVALID_DATA_ERROR).send({ message: err.message }));
};

export const deleteCard = (req: Request, res: Response) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => res.status(NOT_FOUND_ERROR).send({ message: err.message }));
};

export const setLike = (req: CustomRequest, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user && req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(NOT_FOUND_ERROR).send({ message: err.message }));
};

export const removeLike = (req: CustomRequest, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user && req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(NOT_FOUND_ERROR).send({ message: err.message }));
};
