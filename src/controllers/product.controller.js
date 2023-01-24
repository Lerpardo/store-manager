const { productService } = require('../services');

const { mapError } = require('./errorMap');
 
const getProducts = async (_req, res) => {
  const { type, message } = await productService.findAll();

  if (type) return res.status(mapError(type)).json(message);

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(...message);
};

const createNewProduct = async (req, res) => {
  // const produto = req.body;
  const { name } = req.body;
  // const products = await addNewProducts(produto);
  const { type, message } = await productService.createProduct(name);
  
  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  getProducts,
  getProductById,
  createNewProduct,
};