const express = require('express');
const { authenticate, validateBody } = require('../helpers');
const cardsControllers = require('../controllers/cardsControllers.js');
const schemas = require('../schemas/cardSchema.js');

const cardsRouter = express.Router();

cardsRouter.get('/:boardId', authenticate, cardsControllers.getAllCards);

cardsRouter.post(
  '/',
  authenticate,
  validateBody(schemas.createCardSchema),
  cardsControllers.addCard
);

cardsRouter.put(
  '/:cardId',
  authenticate,
  validateBody(schemas.updateCardSchema),
  cardsControllers.updateCard
);

cardsRouter.patch(
  '/:cardId',
  authenticate,
  validateBody(schemas.updateColumnIdinCardSchema),
  cardsControllers.updateColumnIdInCard
);

cardsRouter.delete('/:cardId', authenticate, cardsControllers.deleteCard);

module.exports = cardsRouter;
