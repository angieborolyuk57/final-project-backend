const cntrlWrapper = require("../helpers/cntrlWrapper.js");
const HttpError = require("../helpers/HttpError.js");
const { Board } = require("../models/Board.js");

const getAllCards = async (req, res) => {
  const { boardId, columnId } = req.params;
  const board = await Board.findById(boardId);
  const columnIndex = board.columns.findIndex(
    (column) => column.id === columnId
  );
  if (columnIndex === -1) {
    return res.status(404).json({ message: "Column not found" });
  }
  const column = board.columns[columnIndex];
  const result = column.cards;
  res.json(result);
};

const getOneCard = async (req, res) => {
  const { boardId, columnId, cardId } = req.params;
  const board = await Board.findById(boardId);
  const columnIndex = board.columns.findIndex(
    (column) => column.id === columnId
  );
  if (columnIndex === -1) {
    return res.status(404).json({ message: "Column not found" });
  }
  const column = board.columns[columnIndex];
  const cardIndex = column.cards.findIndex((card) => card.id == cardId);
  if (cardIndex === -1) {
    return res.status(404).json({ message: "Card not found" });
  }
  const card = column.cards[cardIndex];
  res.json(card);
};

const addCard = async (req, res) => {
  try {
    const { boardId, columnId } = req.params;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    const columnIndex = board.columns.findIndex(
      (column) => column.id === columnId
    );
    if (columnIndex === -1) {
      return res.status(404).json({ message: "Column not found" });
    }
    const column = board.columns[columnIndex];
    column.cards.push(req.body);
    await board.save();
    const cardIndex = column.cards.length - 1;
    res.status(201).json(column.cards[cardIndex]);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

const updateCard = async (req, res) => {
  try {
    const { boardId, columnId, cardId } = req.params;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    const columnIndex = board.columns.findIndex(
      (column) => column.id === columnId
    );
    if (columnIndex === -1) {
      return res.status(404).json({ message: "Column not found" });
    }
    const column = board.columns[columnIndex];
    const cardIndex = column.cards.findIndex((card) => card.id == cardId);
    if (cardIndex === -1) {
      return res.status(404).json({ message: "Card not found" });
    }
    const tmpCard = column.cards[cardIndex];
    column.cards.splice(cardIndex, 1, {
      ...tmpCard,
      ...req.body,
      _id: cardId,
    });
    await board.save();
    res.json(column.cards[cardIndex]);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { boardId, columnId, cardId } = req.params;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    const columnIndex = board.columns.findIndex(
      (column) => column.id === columnId
    );
    if (columnIndex === -1) {
      return res.status(404).json({ message: "Column not found" });
    }
    const column = board.columns[columnIndex];
    const cardIndex = column.cards.findIndex((card) => card.id == cardId);
    if (cardIndex === -1) {
      return res.status(404).json({ message: "Card not found" });
    }
    const deletedCard = column.cards[cardIndex];
    column.cards.splice(cardIndex, 1);
    await board.save();
    res.json(deletedCard);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

module.exports = {
  getAllCards: cntrlWrapper(getAllCards),
  getOneCard: cntrlWrapper(getOneCard),
  addCard: cntrlWrapper(addCard),
  updateCard: cntrlWrapper(updateCard),
  deleteCard: cntrlWrapper(deleteCard),
};
