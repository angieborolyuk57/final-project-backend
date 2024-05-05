const cntrlWrapper = require("../helpers/cntrlwrapper.js");
const { Board } = require("../models/Board.js");

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

const addColumn = async (req, res) => {
  try {
    const { boardId } = req.params;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    const { title } = req.body;
    const existingColumnIndex = board.columns.findIndex(
      (col) => col.title === title
    );
    if (existingColumnIndex !== -1) {
      return res.status(409).json({
        message: "This title is already in use",
      });
    }
    board.columns.push(req.body);
    const updatedBoard = await board.save();
    const columnIndex = updatedBoard.columns.length - 1;
    res.status(201).json(updatedBoard.columns[columnIndex]);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
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
    board.columns.splice(columnIndex, 1, {
      ...req.body,
      _id: columnId,
      cards: [...board.columns[tmpIndex].cards],
    });
    const updatedBoard = await board.save();
    res.json(updatedBoard.columns[tmpIndex]);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
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

module.exports = {
  getAllColumns: cntrlWrapper(getAllColumns),
  getOneColumn: cntrlWrapper(getOneColumn),
  addColumn: cntrlWrapper(addColumn),
  updateColumn: cntrlWrapper(updateColumn),
  deleteColumn: cntrlWrapper(deleteColumn),
};
