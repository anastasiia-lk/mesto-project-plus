import { Router } from 'express';
import {
  createUser,
  getUserById,
  getUsers
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:id', getUserById);

export default usersRouter;
