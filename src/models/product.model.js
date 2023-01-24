const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM  StoreManager.products',
  );
  return result;
};

const findById = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM  StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const insert = async (passenger) => {
  const columns = Object.keys((passenger)).join(', ');

  const placeholders = Object.keys(passenger)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(passenger)],
  );

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};