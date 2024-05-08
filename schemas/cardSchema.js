const Joi = require('joi');

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

module.exports = {
  createCardSchema,
  updateCardSchema,
};
