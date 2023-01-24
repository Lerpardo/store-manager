const { idSchema, addProductSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema.validate({ name });
  if (error && name) return { type: 'INVALID_VALUE', message: error.message };
  if (error) return { type: 'MISSING_KEY', message: error.message };
  return { type: null, message: '' };
};
module.exports = {
  validateId,
  validateNewProduct,
};