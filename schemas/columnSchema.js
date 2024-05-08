const Joi = require('joi');

const createColumnSchema = Joi.object({
  title: Joi.string().required(),
  cards: Joi.array(),
});

const updateColumnSchema = Joi.object({
  title: Joi.string(),
  cards: Joi.array(),
});

module.exports = {
  createColumnSchema,
  updateColumnSchema,
};
