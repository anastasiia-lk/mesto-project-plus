import { Router } from 'express';
import {
  getUsers,
  createUser,
  getUser,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:id', getUser);

export default usersRouter;
