import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  setLike,
  removeLike,
} from '../controllers/cards';
import {
  createCardValidation,
  cardValidation,
} from '../utils/validation';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCardValidation, createCard);
cardsRouter.delete('/:cardId', cardValidation, deleteCard);
cardsRouter.put('/:cardId/likes', cardValidation, setLike);
cardsRouter.delete('/:cardId/likes', cardValidation, removeLike);

export default cardsRouter;
