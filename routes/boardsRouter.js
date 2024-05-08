const express = require('express');
const boardsControllers = require('../controllers/boardsControllers.js');
const columnsControllers = require('../controllers/columnsControllers.js');
const cardsControllers = require('../controllers/cardsControllers.js');
const validateBody = require('../helpers/validateBody.js');
const authenticate = require('../helpers/authenticate.js');
const {
  createBoardSchema,
  updateBoardSchema,
} = require('../schemas/boardSchema.js');
const {
  createCardSchema,
  updateCardSchema,
} = require('../schemas/cardSchema.js');

const {
  createColumnSchema,
  updateColumnSchema,
} = require('../schemas/columnSchema.js');

//Express Router

const boardsRouter = express.Router();

boardsRouter.use(authenticate);

//Board Endpoints

boardsRouter.get('/', boardsControllers.getAllBoards);

boardsRouter.post(
  '/',
  validateBody(createBoardSchema),
  boardsControllers.addBoard
);

boardsRouter.put(
  '/:boardId',
  validateBody(updateBoardSchema),
  boardsControllers.updateBoard
);

boardsRouter.delete('/:boardId', boardsControllers.deleteBoard);

//Column Endpoints

boardsRouter.get('/:boardId/columns/', columnsControllers.getAllColumns);

boardsRouter.post(
  '/:boardId/columns/',
  validateBody(createColumnSchema),
  columnsControllers.addColumn
);

boardsRouter.put(
  '/:boardId/columns/:columnId',
  validateBody(updateColumnSchema),
  columnsControllers.updateColumn
);

boardsRouter.delete(
  '/:boardId/columns/:columnId',
  columnsControllers.deleteColumn
);

//Card Endpoints

boardsRouter.get(
  '/:boardId/columns/:columnId/cards/',
  cardsControllers.getAllCards
);

boardsRouter.post(
  '/:boardId/columns/:columnId/cards/',
  validateBody(createCardSchema),
  cardsControllers.addCard
);

boardsRouter.put(
  '/:boardId/columns/:columnId/cards/:cardId',
  validateBody(updateCardSchema),
  cardsControllers.updateCard
);

boardsRouter.delete(
  '/:boardId/columns/:columnId/cards/:cardId',
  cardsControllers.deleteCard
);

module.exports = boardsRouter;
