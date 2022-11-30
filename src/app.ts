// app.ts — входной файл
import express, { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import NotFound from './utils/errors/NotFound';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import error from './middlewares/error';
import auth from './middlewares/auth';
import { login, createUser } from './controllers/users';
import { requestLogger, errorLogger } from './middlewares/logger';
import {
  loginValidation,
  createUserValidation,
} from './utils/validation';

mongoose.connect('mongodb://localhost:27017/mestodb');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use(requestLogger);

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((_req: Request, res: Response, next: NextFunction) => {
  next(new NotFound('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT);
