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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productService.update(name, id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(...message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productService.delProc(id); 

  if (type) return res.status(mapError(type)).json({ message });

  res.status(204).json();
};

const queryProduct = async (req, res) => {
  const { q } = req.query;

  const { type, message } = await productService.queryProducts(q);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  queryProduct,
  deleteProduct,
  getProducts,
  getProductById,
  createNewProduct,
  updateProduct,
};