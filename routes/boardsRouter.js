const express = require("express");
const boardsControllers = require("../controllers/boardsControllers.js");
const columnsControllers = require("../controllers/columnsControllers.js");
const cardsControllers = require("../controllers/cardsControllers.js");
const validateBody = require("../helpers/validateBody.js");
const {
  createBoardSchema,
  updateBoardSchema,
  createColumnSchema,
  updateColumnSchema,
  createCardSchema,
  updateCardSchema,
} = require("../models/Board.js");
const boardsRouter = express.Router();

//Board routes

boardsRouter.get("/", boardsControllers.getAllBoards);

boardsRouter.get("/:boardId", boardsControllers.getOneBoard);

boardsRouter.post(
  "/",
  validateBody(createBoardSchema),
  boardsControllers.addBoard
);

boardsRouter.put(
  "/:boardId",
  validateBody(updateBoardSchema),
  boardsControllers.updateBoard
);

boardsRouter.delete("/:boardId", boardsControllers.deleteBoard);

//Column routes

boardsRouter.get("/:boardId/columns/", columnsControllers.getAllColumns);

boardsRouter.get(
  "/:boardId/columns/:columnId",
  columnsControllers.getOneColumn
);

boardsRouter.post(
  "/:boardId/columns/",
  validateBody(createColumnSchema),
  columnsControllers.addColumn
);

boardsRouter.put(
  "/:boardId/columns/:columnId",
  validateBody(updateColumnSchema),
  columnsControllers.updateColumn
);

boardsRouter.delete(
  "/:boardId/columns/:columnId",
  columnsControllers.deleteColumn
);

//Card routes

boardsRouter.get(
  "/:boardId/columns/:columnId/cards/",
  cardsControllers.getAllCards
);

boardsRouter.get(
  "/:boardId/columns/:columnId/cards/:cardId",
  cardsControllers.getOneCard
);

boardsRouter.post(
  "/:boardId/columns/:columnId/cards/",
  validateBody(createCardSchema),
  cardsControllers.addCard
);

boardsRouter.put(
  "/:boardId/columns/:columnId/cards/:cardId",
  validateBody(updateColumnSchema),
  cardsControllers.updateCard
);

boardsRouter.delete(
  "/:boardId/columns/:columnId/cards/:cardId",
  cardsControllers.deleteCard
);

module.exports = boardsRouter;
