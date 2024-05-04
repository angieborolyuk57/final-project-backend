const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const boardSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Set title for board"],
    },
    columns: {
      type: [
        {
          title: {
            type: String,
            required: [true, "Set title for column"],
          },
          cards: {
            type: [
              {
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
              },
            ],
            default: [],
          },
        },
      ],
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
});

const Board = model("board", boardSchema);

module.exports = {
  Board,
  createBoardSchema,
  updateBoardSchema,
  createColumnSchema,
  updateColumnSchema,
  createCardSchema,
  updateCardSchema,
};
