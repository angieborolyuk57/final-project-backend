const { Schema, model } = require('mongoose');
const { columnSchema } = require('./Column.js');

const boardSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Set title for board'],
    },
    columns: {
      type: [columnSchema],
      default: [],
    },
    icon: {
      type: String,
      default: 'default',
    },
    background: {
      type: String,
      default: 'default',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Board = model('board', boardSchema);

module.exports = {
  Board,
};
