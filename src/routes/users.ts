import { Router } from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} from '../controllers/users';

import {
  getUserValidation,
  updateUserValidation,
  updateAvatarValidation,
} from '../utils/validation';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:id', getUserValidation, getUser);
usersRouter.patch('/me', updateUserValidation, updateUser);
usersRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);

export default usersRouter;
