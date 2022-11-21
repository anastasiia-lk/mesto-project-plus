import { Request, Response } from 'express';
import User from '../models/user';
import { INVALID_DATA_ERROR, NOT_FOUND_ERROR, DEFAULT_ERROR } from './cards';

export interface CustomRequest extends Request {
  user?: {
    _id: string
  }
}
export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

export const getUser = (req: Request, res: Response) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(NOT_FOUND_ERROR).send({ message: err.message }));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(INVALID_DATA_ERROR).send({ message: err.message }));
};

export const updateUser = (req: CustomRequest, res: Response) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user && req.user._id,
    { name, about },
    { new: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(INVALID_DATA_ERROR).send({ message: err.message }));
};

export const updateAvatar = (req: CustomRequest, res: Response) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user && req.user._id,
    { avatar },
    { new: true },
  )
    .then((setAvatar) => res.send({ data: setAvatar }))
    .catch((err) => res.status(INVALID_DATA_ERROR).send({ message: err.message }));
};
