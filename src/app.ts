// app.ts — входной файл
import express, { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import { NOT_FOUND_ERROR } from './utils/constants';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { login, createUser } from './controllers/users';

export interface CustomRequest extends Request {
  user?: {
    _id: string
  }
}

mongoose.connect('mongodb://localhost:27017/mestodb');

const { PORT = 3000 } = process.env;

const app = express();

app.use((req: CustomRequest, _res: Response, next: NextFunction) => {
  req.user = {
    _id: '63792c5df41fa295d3b91bd6',
  };

  next();
});
app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req: Request, res: Response) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Ресурс не найден' });
});

app.listen(PORT);
