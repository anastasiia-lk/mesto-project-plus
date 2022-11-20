import { Request, Response } from 'express';
import Card from '../models/card';

export const INVALID_DATA_ERROR = 400;

export const NOT_FOUND_ERROR = 404;

export const DEFAULT_ERROR = 500;

export const getCards = (_req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

export const createCard = (req: any, res: Response) => {
  const { name, link } = req.body;
  const likes: any[] = [];
  Card.create({
    name,
    link,
    owner: req.user._id,
    likes,
  })
    .then((card) => res.send(card))
    .catch((err) => res.status(INVALID_DATA_ERROR).send({ message: err.message }));
};

export const deleteCard = (req: Request, res: Response) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => res.status(NOT_FOUND_ERROR).send({ message: err.message }));
};

export const setLike = (req: any, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card?.likes }))
    .catch((err) => res.status(NOT_FOUND_ERROR).send({ message: err.message }));
};

export const removeLike = (req: any, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card?.likes }))
    .catch((err) => res.status(NOT_FOUND_ERROR).send({ message: err.message }));
};
