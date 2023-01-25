const { saleProductModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await saleProductModel.findAll();
  if (!products.length) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: products };
};

const findById = async (id) => {
  const product = await saleProductModel.findById(id);
  if (!product.length) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: product };
};

const insert = async (sale) => {
  // const idError = await schema.validateProductsIds(sale);
  // if (idError.type) return idError;

  const error = await schema.validateSaleProduct(sale);
  if (error.type) return error;

  const newSale = await saleProductModel.insert(sale);
  
  return { type: null, message: { id: newSale, itemsSold: sale } };
};

module.exports = {
  findAll,
  findById,
  insert,
};