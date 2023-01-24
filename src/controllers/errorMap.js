const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  MISSING_KEY: 400,
  INVALID_VALUE: 422,
  TRAVEL_NOT_FOUND: 404,
  DRIVER_NOT_FOUND: 404,
  TRAVEL_CONFLICT: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};