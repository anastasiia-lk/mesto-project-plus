import { Router } from 'express';
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  updateAvatar,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:id', getUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

export default usersRouter;
