const { saleProductModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await saleProductModel.findAll();
  return { type: null, message: products };
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
  insert,
};