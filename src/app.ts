// app.ts — входной файл
import express, { Response, Request } from 'express';
import mongoose from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { NOT_FOUND_ERROR } from './utils/constants';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { login, createUser } from './controllers/users';

export interface CustomRequest extends Request {
  user?: {
    _id: JwtPayload
  }
}

mongoose.connect('mongodb://localhost:27017/mestodb');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req: Request, res: Response) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Ресурс не найден' });
});

app.listen(PORT);
