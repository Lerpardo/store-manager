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

module.exports = {
  getSales,
  getSaleById,
  createNewSale,
};