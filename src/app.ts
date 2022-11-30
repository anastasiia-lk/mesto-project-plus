// app.ts — входной файл
import express, { Response, Request } from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import auth from './middlewares/auth';
import { login, createUser } from './controllers/users';
import { NOT_FOUND_ERROR } from './utils/constants';
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

app.use((req: Request, res: Response) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Ресурс не найден' });
});

app.use(errorLogger);

app.listen(PORT);
