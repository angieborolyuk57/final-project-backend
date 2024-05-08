const { errorCatcher, HttpError } = require('../helpers');
const { Board } = require('../models/Board.js');
const boardsServices = require('../services/boardsServices.js');

const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const boards = await boardsServices.listBoards(owner);
  res.json(boards);
};

const addBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { title } = req.body;
  const board = await boardsServices.getOneBoardByFilter({
    owner,
    title: title,
  });
  if (board) {
    return res.status(409).json({ message: 'This title is already in use' });
  }
  const result = await boardsServices.addBoard({ owner, ...req.body });
  res.status(201).json(result);
};

const updateBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { boardId } = req.params;
  const { title } = req.body;
  const board = await boardsServices.getOneBoardByFilter({
    owner,
    title: title,
  });
  if (board) {
    return res.status(409).json({ message: 'This title is already in use' });
  }
  const result = await boardsServices.updateBoardByFilter(
    { owner, _id: boardId },
    req.body
  );
  if (!result) throw HttpError(404, `Board not found`);
  res.json(result);
};

const deleteBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { boardId } = req.params;
  const result = await boardsServices.removeBoardByFilter({
    owner,
    _id: boardId,
  });
  if (!result) throw HttpError(404, `Board not found`);
  res.json(result);
};

module.exports = {
  getAllBoards: errorCatcher(getAllBoards),
  addBoard: errorCatcher(addBoard),
  updateBoard: errorCatcher(updateBoard),
  deleteBoard: errorCatcher(deleteBoard),
};
