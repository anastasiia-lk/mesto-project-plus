// app.ts — входной файл
import express, { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

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
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
