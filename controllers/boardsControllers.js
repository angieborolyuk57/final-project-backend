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

const addBoard = async (req, res) => {
  const result = await Board.create({ ...req.body });
  res.status(201).json(result);
};

const updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const result = await Board.findByIdAndUpdate(boardId, req.body);
  if (!result) throw HttpError(404, `Not found`);
  res.json(result);
};

const deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  const result = await Board.findByIdAndDelete(boardId);
  if (!result) throw HttpError(404, `Not found`);
  res.json(result);
};

module.exports = {
  getAllBoards: cntrlWrapper(getAllBoards),
  getOneBoard: cntrlWrapper(getOneBoard),
  addBoard: cntrlWrapper(addBoard),
  updateBoard: cntrlWrapper(updateBoard),
  deleteBoard: cntrlWrapper(deleteBoard),
};
