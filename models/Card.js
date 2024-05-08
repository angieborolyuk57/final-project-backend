const { Schema, model } = require('mongoose');

const priorityList = ['Without priority', 'Low', 'Medium', 'High'];

const cardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Set title for card'],
  },
  description: {
    type: String,
    required: [true, 'Set description for card'],
  },
  priority: {
    type: String,
    enum: priorityList,
    default: 'Low',
  },
  color: {
    type: String,
    default: null,
  },
  deadline: {
    type: Date,
    required: [true, 'Set deadline for card'],
  },
});

const Card = model('card', cardSchema);

module.exports = {
  Card,
  cardSchema,
};
