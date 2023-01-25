const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const pointSchema = Joi.string().min(5).required();

const addProductSchema = Joi.object({
  name: pointSchema,
});

const saleProductSchema = Joi.array().items(Joi.object({
  productId: idSchema,
  quantity: idSchema,
}));

module.exports = {
  idSchema,
  addProductSchema,
  saleProductSchema,
};