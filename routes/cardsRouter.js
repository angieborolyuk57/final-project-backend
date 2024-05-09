const express = require('express');
const { authenticate, validateBody } = require('../helpers');
const cardsControllers = require('../controllers/cardsControllers.js');
const {
  createCardSchema,
  updateCardSchema,
  updateColumnIdInCardSchema,
} = require('../schemas/cardSchema.js');

const cardsRouter = express.Router();

cardsRouter.get('/:boardId', authenticate, cardsControllers.getAllCards);

cardsRouter.post(
  '/',
  authenticate,
  validateBody(createCardSchema),
  cardsControllers.addCard
);

cardsRouter.put(
  '/:cardId',
  authenticate,
  validateBody(updateCardSchema),
  cardsControllers.updateCard
);

cardsRouter.patch(
  '/:cardId',
  authenticate,
  validateBody(updateColumnIdInCardSchema),
  cardsControllers.updateColumnIdInCard
);

cardsRouter.delete('/:cardId', authenticate, cardsControllers.deleteCard);

module.exports = cardsRouter;
