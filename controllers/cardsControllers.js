const { errorCatcher } = require('../helpers');
const { Board } = require('../models/Board.js');

const getAllCards = async (req, res) => {
  const { boardId, columnId } = req.params;
  const board = await Board.findById(boardId);
  if (!board) {
    return res.status(404).json({ message: 'Board not found' });
  }
  const column = board.columns.find(col => col.id === columnId);
  if (!column) {
    return res.status(404).json({ message: 'Column not found' });
  }
  res.json(column.cards);
};

const addCard = async (req, res) => {
  const { boardId, columnId } = req.params;
  const board = await Board.findById(boardId);
  if (!board) {
    return res.status(404).json({ message: 'Board not found' });
  }
  const column = board.columns.find(col => col.id === columnId);
  if (!column) {
    return res.status(404).json({ message: 'Column not found' });
  }
  const { title } = req.body;
  const existingCardIndex = column.cards.findIndex(col => col.title === title);
  if (existingCardIndex !== -1) {
    return res.status(409).json({
      message: 'This title is already in use',
    });
  }
  column.cards.push(req.body);
  await board.save();
  const newCard = column.cards[column.cards.length - 1];
  res.status(201).json(newCard);
};

const updateCard = async (req, res) => {
  const { boardId, columnId, cardId } = req.params;
  const board = await Board.findById(boardId);
  if (!board) {
    return res.status(404).json({ message: 'Board not found' });
  }
  const column = board.columns.find(col => col.id === columnId);
  if (!column) {
    return res.status(404).json({ message: 'Column not found' });
  }
  const cardIndex = column.cards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).json({ message: 'Card not found' });
  }
  const { title, description, color, deadline, _id } = column.cards[cardIndex];
  column.cards[cardIndex] = {
    title,
    description,
    color,
    deadline,
    ...req.body,
    _id,
  };
  await board.save();
  res.json(column.cards[cardIndex]);
};

const deleteCard = async (req, res) => {
  const { boardId, columnId, cardId } = req.params;
  const board = await Board.findById(boardId);
  if (!board) {
    return res.status(404).json({ message: 'Board not found' });
  }
  const column = board.columns.find(col => col.id === columnId);
  if (!column) {
    return res.status(404).json({ message: 'Column not found' });
  }
  const cardIndex = column.cards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).json({ message: 'Card not found' });
  }
  const deletedCard = column.cards.splice(cardIndex, 1)[0];
  await board.save();
  res.json(deletedCard);
};

module.exports = {
  getAllCards: errorCatcher(getAllCards),
  addCard: errorCatcher(addCard),
  updateCard: errorCatcher(updateCard),
  deleteCard: errorCatcher(deleteCard),
};
