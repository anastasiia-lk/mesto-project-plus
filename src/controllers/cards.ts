import { Request, Response } from 'express';
import Card from '../models/card';

export const getCards = (_req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
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
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const deleteCardById = (req: Request, res: Response) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};
