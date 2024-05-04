const cntrlWrapper = require("../helpers/cntrlwrapper.js");
const HttpError = require("../helpers/HttpError.js");
const { Board } = require("../models/Board.js");

const getAllBoards = async (req, res) => {
  const result = await Board.find({});
  res.json(result);
};

const getOneBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.json(board);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

const getAllColumns = async (req, res) => {
  const { boardId } = req.params;
  const board = await Board.findById(boardId);
  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }
  const result = board.columns;
  res.json(result);
};

const getOneColumn = async (req, res) => {
  const { boardId, columnId } = req.params;
  const board = await Board.findById(boardId);
  const columnIndex = board.columns.findIndex(
    (column) => column.id === columnId
  );
  if (columnIndex === -1) {
    return res.status(404).json({ message: "Column not found" });
  }
  const result = board.columns[columnIndex];
  res.json(result);
};

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

const addBoard = async (req, res) => {
  const result = await Board.create({ ...req.body });
  res.status(201).json(result);
};

const addColumn = async (req, res) => {
  try {
    const { boardId } = req.params;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    board.columns.push(req.body);
    const updatedBoard = await board.save();
    const columnIndex = updatedBoard.columns.length - 1;
    res.status(201).json(updatedBoard.columns[columnIndex]);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
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

const updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const result = await Board.findByIdAndUpdate(boardId, req.body);
  if (!result) throw HttpError(404, `Not found`);
  res.json(result);
};

const updateColumn = async (req, res) => {
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
    const tmpIndex = columnIndex;
    board.columns.splice(columnIndex, 1, { ...req.body, _id: columnId });
    const updatedBoard = await board.save();
    res.json(updatedBoard.columns[tmpIndex]);
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
    column.cards.splice(cardIndex, 1, { ...req.body, _id: cardId });
    await board.save();
    res.json(column.cards[cardIndex]);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

const deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  const result = await Board.findByIdAndDelete(boardId);
  if (!result) throw HttpError(404, `Not found`);
  res.json(result);
};

const deleteColumn = async (req, res) => {
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
    const deletedColumn = board.columns[columnIndex];
    board.columns.splice(columnIndex, 1);
    await board.save();
    res.json(deletedColumn);
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
  getAllBoards: cntrlWrapper(getAllBoards),
  getOneBoard: cntrlWrapper(getOneBoard),
  getAllColumns: cntrlWrapper(getAllColumns),
  getOneColumn: cntrlWrapper(getOneColumn),
  getAllCards: cntrlWrapper(getAllCards),
  getOneCard: cntrlWrapper(getOneCard),
  addBoard: cntrlWrapper(addBoard),
  addColumn: cntrlWrapper(addColumn),
  addCard: cntrlWrapper(addCard),
  updateBoard: cntrlWrapper(updateBoard),
  updateColumn: cntrlWrapper(updateColumn),
  updateCard: cntrlWrapper(updateCard),
  deleteBoard: cntrlWrapper(deleteBoard),
  deleteColumn: cntrlWrapper(deleteColumn),
  deleteCard: cntrlWrapper(deleteCard),
};
