const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;
  
  const product = await productModel.findById(productId);

  if (product.length === 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;

  const newPassengerId = await productModel.insert({ name });
  const [newPassenger] = await productModel.findById(newPassengerId);

  return { type: null, message: newPassenger };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};