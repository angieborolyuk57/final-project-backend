const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError.js');

const iconList = [
  'four-circles',
  'eye',
  'star',
  'loading',
  'puzzle',
  'container',
  'logo',
  'hexagon',
];

const boardSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Set title for board'],
    },
    icon: {
      type: String,
      default: 'four-circles',
      enum: iconList,
    },
    background: {
      type: String,
      default: '1',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

boardSchema.post('save', handleMongooseError);

const Board = model('board', boardSchema);

module.exports = {
  Board,
};
