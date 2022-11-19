import { Router } from 'express';
import {
  createCard,
  deleteCardById,
  getCards,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCardById);

export default cardsRouter;
