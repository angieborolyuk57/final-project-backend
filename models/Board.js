const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const setUpdateSetting = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};

const cardSchema = new Schema({
  title: {
    type: String,
    required: [true, "Set title for card"],
  },
  description: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: null,
  },
  deadline: {
    type: Date,
    default: null,
  },
});

const columnSchema = new Schema({
  title: {
    type: String,
    required: [true, "Set title for column"],
  },
  cards: {
    type: [cardSchema],
    default: [],
  },
});

const boardSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Set title for board"],
    },
    columns: {
      type: [columnSchema],
      default: [],
    },
    icon: {
      type: String,
      default: null,
    },
    background: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

boardSchema.post("save", handleMongooseError);

boardSchema.pre("findOneAndUpdate", setUpdateSetting);

boardSchema.post("findOneAndUpdate", handleMongooseError);

columnSchema.post("save", handleMongooseError);

columnSchema.pre("findOneAndUpdate", setUpdateSetting);

columnSchema.post("findOneAndUpdate", handleMongooseError);

cardSchema.post("save", handleMongooseError);

cardSchema.pre("findOneAndUpdate", setUpdateSetting);

cardSchema.post("findOneAndUpdate", handleMongooseError);

const createBoardSchema = Joi.object({
  title: Joi.string().required(),
  columns: Joi.array(),
  icon: Joi.string(),
  background: Joi.string(),
});

const updateBoardSchema = Joi.object({
  title: Joi.string(),
  columns: Joi.array(),
  icon: Joi.string(),
  background: Joi.string(),
});

const createColumnSchema = Joi.object({
  title: Joi.string().required(),
  cards: Joi.array(),
});

const updateColumnSchema = Joi.object({
  title: Joi.string(),
  cards: Joi.array(),
});

const createCardSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  color: Joi.string(),
  deadline: Joi.date(),
});

const updateCardSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  color: Joi.string(),
  deadline: Joi.date(),
}).min(1);

const Board = model("board", boardSchema);

const Column = model("column", columnSchema);

const Card = model("card", cardSchema);

module.exports = {
  Board,
  Column,
  Card,
  createBoardSchema,
  updateBoardSchema,
  createColumnSchema,
  updateColumnSchema,
  createCardSchema,
  updateCardSchema,
};
