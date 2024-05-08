const { Board } = require('../models/Board.js');

const listBoards = owner => Board.find({ owner });

const getOneBoardByFilter = filter => Board.findOne(filter);

const addBoard = data => Board.create(data);

const updateBoardByFilter = (filter, update) =>
  Board.findOneAndUpdate(filter, update, { new: true });

const removeBoardByFilter = filter => Board.findOneAndDelete(filter);

module.exports = {
  listBoards,
  getOneBoardByFilter,
  addBoard,
  updateBoardByFilter,
  removeBoardByFilter,
};
