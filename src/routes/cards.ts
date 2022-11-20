import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  setLike,
  removeLike,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', setLike);
cardsRouter.delete('/:cardId/likes', removeLike);

export default cardsRouter;
