const { Schema, model } = require('mongoose');
const { cardSchema } = require('./Card.js');

const columnSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Set title for column'],
  },
  cards: {
    type: [cardSchema],
    default: [],
  },
});

const Column = model('column', columnSchema);

module.exports = {
  Column,
  columnSchema,
};
