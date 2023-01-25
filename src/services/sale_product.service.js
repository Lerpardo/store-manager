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
  const error = await schema.validateSaleProduct(sale);
  if (error.type) return error;

  const newSale = await saleProductModel.insert(sale);
  
  return { type: null, message: { id: newSale, itemsSold: sale } };
};

const update = async (values, id) => {
  const newProduct = await saleProductModel.findById(id);
  if (!newProduct.length) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };
  const error = await schema.validateSaleProduct(values);
  if (error.type) return error;
  await saleProductModel.update(values, id);

  return { type: null, message: { saleId: id, itemsUpdated: values } };
};

const delProc = async (id) => {
  const newProduct = await saleProductModel.findById(id);

  if (!newProduct.length) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };

  await saleProductModel.delProc(id);

  return { type: null, message: '' };
};

module.exports = {
  delProc,
  update,
  findAll,
  findById,
  insert,
};