const { errorCatcher } = require('../helpers');
const { Board } = require('../models/Board.js');
const { login } = require('./authControllers.js');
const boardsServices = require('../services/boardsServices.js');

const getAllColumns = async (req, res) => {
  const { boardId } = req.params;
  const board = await Board.findById(boardId);
  if (!board) {
    return res.status(404).json({ message: 'Board not found' });
  }
  res.json(board.columns);
};

const addColumn = async (req, res) => {
  const { _id: owner } = req.user;
  const { boardId } = req.params;
  const board = await boardsServices.getOneBoardByFilter({
    owner,
    _id: boardId,
  });
  if (!board) {
    return res.status(404).json({ message: 'Board not found' });
  }
  const { title } = req.body;
  const existingColumnIndex = board.columns.findIndex(
    col => col.title === title
  );
  if (existingColumnIndex !== -1) {
    return res.status(409).json({
      message: 'This title is already in use',
    });
  }
  board.columns.push(req.body);
  const updatedBoard = await board.save();
  const columnIndex = updatedBoard.columns.length - 1;
  res.status(201).json(updatedBoard.columns[columnIndex]);
};

const updateColumn = async (req, res) => {
  const { boardId, columnId } = req.params;
  const board = await Board.findById(boardId);
  if (!board) {
    return res.status(404).json({ message: 'Board not found' });
  }
  const columnIndex = board.columns.findIndex(column => column.id === columnId);
  if (columnIndex === -1) {
    return res.status(404).json({ message: 'Column not found' });
  }
  const tmpIndex = columnIndex;
  board.columns.splice(columnIndex, 1, {
    ...req.body,
    _id: columnId,
    cards: [...board.columns[tmpIndex].cards],
  });
  const updatedBoard = await board.save();
  res.json(updatedBoard.columns[tmpIndex]);
};

const deleteColumn = async (req, res) => {
  const { boardId, columnId } = req.params;
  const board = await Board.findById(boardId);
  if (!board) {
    return res.status(404).json({ message: 'Board not found' });
  }
  const columnIndex = board.columns.findIndex(column => column.id === columnId);
  if (columnIndex === -1) {
    return res.status(404).json({ message: 'Column not found' });
  }
  const deletedColumn = board.columns[columnIndex];
  board.columns.splice(columnIndex, 1);
  await board.save();
  res.json(deletedColumn);
};

module.exports = {
  getAllColumns: errorCatcher(getAllColumns),
  addColumn: errorCatcher(addColumn),
  updateColumn: errorCatcher(updateColumn),
  deleteColumn: errorCatcher(deleteColumn),
};
