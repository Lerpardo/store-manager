const { saleProductService } = require('../services');
const { mapError } = require('./errorMap');

const getSales = async (_req, res) => {
  const { type, message } = await saleProductService.findAll();

  if (type) return res.status(mapError(type)).json(message);

  res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await saleProductService.findById(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const createNewSale = async (req, res) => {
  const sale = req.body;

  const { type, message } = await saleProductService.insert(sale);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const upSale = req.body;

  const { type, message } = await saleProductService.update(upSale, id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await saleProductService.delProc(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(204).json();
};

module.exports = {
  deleteProduct,
  updateProduct,
  getSales,
  getSaleById,
  createNewSale,
};