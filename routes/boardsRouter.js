const express = require("express");
const boardsControllers = require("../controllers/boardsControllers.js");
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

boardsRouter.get("/", boardsControllers.getAllBoards);

boardsRouter.get("/:boardId", boardsControllers.getOneBoard);

boardsRouter.get("/:boardId/columns/", boardsControllers.getAllColumns);

boardsRouter.get("/:boardId/columns/:columnId", boardsControllers.getOneColumn);

boardsRouter.get(
  "/:boardId/columns/:columnId/cards/",
  boardsControllers.getAllCards
);

boardsRouter.get(
  "/:boardId/columns/:columnId/cards/:cardId",
  boardsControllers.getOneCard
);

boardsRouter.post(
  "/",
  validateBody(createBoardSchema),
  boardsControllers.addBoard
);

boardsRouter.post(
  "/:boardId/columns/",
  validateBody(createColumnSchema),
  boardsControllers.addColumn
);

boardsRouter.post(
  "/:boardId/columns/:columnId/cards/",
  validateBody(createCardSchema),
  boardsControllers.addCard
);

boardsRouter.put(
  "/:boardId",
  validateBody(updateBoardSchema),
  boardsControllers.updateBoard
);

boardsRouter.put(
  "/:boardId/columns/:columnId",
  validateBody(updateColumnSchema),
  boardsControllers.updateColumn
);

boardsRouter.put(
  "/:boardId/columns/:columnId/cards/:cardId",
  validateBody(updateColumnSchema),
  boardsControllers.updateCard
);

boardsRouter.delete("/:boardId", boardsControllers.deleteBoard);

boardsRouter.delete(
  "/:boardId/columns/:columnId",
  boardsControllers.deleteColumn
);

boardsRouter.delete(
  "/:boardId/columns/:columnId/cards/:cardId",
  boardsControllers.deleteCard
);

module.exports = boardsRouter;
