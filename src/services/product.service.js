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

  if (!product.length) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;

  const newProductId = await productModel.insert({ name });
  const [newProduct] = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const update = async (name, id) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;

  await productModel.update(name, id);
  const newProduct = await productModel.findById(id);

  if (!newProduct.length) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: newProduct };
};

const delProc = async (id) => {
  const newProduct = await productModel.findById(id);

  if (!newProduct.length) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productModel.delProc(id);

  return { type: null, message: '' };
};

const queryProducts = async (query) => {
  const queried = await productModel.queryProducts(query);

  return { type: null, message: queried };
};

module.exports = {
  delProc,
  findAll,
  findById,
  createProduct,
  update,
  queryProducts,
};