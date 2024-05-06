const { cntrlWrapper, HttpError } = require("../helpers");
const { Board } = require("../models/board.js");

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
  try {
    const { title } = req.body;
    const board = await Board.find({ title });
    if (board && board.length > 0) {
      return res.status(409).json({ message: "This title is already in use" });
    }
    const result = await Board.create({ ...req.body });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

const updateBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { title } = req.body;
    const board = await Board.find({ title });
    if (board && board.length > 0) {
      return res.status(409).json({ message: "This title is already in use" });
    }
    const result = await Board.findByIdAndUpdate(boardId, req.body);
    if (!result) throw HttpError(404, `Not found`);
    res.json(result);
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

module.exports = {
  getAllBoards: cntrlWrapper(getAllBoards),
  getOneBoard: cntrlWrapper(getOneBoard),
  addBoard: cntrlWrapper(addBoard),
  updateBoard: cntrlWrapper(updateBoard),
  deleteBoard: cntrlWrapper(deleteBoard),
};
