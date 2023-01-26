const { productModel } = require('../../models');
const { idSchema, addProductSchema, saleProductSchema } = require('./schemas');

const notFounded = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema.validate({ name });
  if (error && name) return { type: 'INVALID_VALUE', message: error.message };
  if (error) return { type: 'MISSING_KEY', message: error.message };
  return { type: null, message: '' };
};

const validateSaleProduct = async (sale) => {
  const { error } = saleProductSchema.validate(sale);

  if (error) {
 return { type: (error.message)
      .includes('required') ? 'MISSING_KEY' : 'INVALID_VALUE',
    message: (error.message).replace(/\[.{0,3}/g, ''),
  }; 
}

    const saProIds = await Promise.all(sale.map(async (saProId) => saProId.productId));

  const saleProducts = await Promise.all(
    saProIds.map(async (productIdss) => productModel.findById(productIdss)),
  );

  const someProductIsMissing = saleProducts.some((product) => product.length === 0);
  if (someProductIsMissing) return notFounded;
  
  return { type: null, message: '' };
};

// const validateProductsIds = async (sale) => {
//   if (Object.keys(sale[0])[0] === 'quantity') {
//  return {
//     type: 'PRODUCT_NOT_FOUND', message: 'Product not found',
//   }; 
// }
  
//   return { type: null, message: '' };
// };
module.exports = {
  validateId,
  validateNewProduct,
  validateSaleProduct,
};
