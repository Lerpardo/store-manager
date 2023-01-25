const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM  StoreManager.sales_products',
  );
  return result;
};

const findById = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM  StoreManager.sales_products WHERE sale_id = ?',
    [productId],
  );
  return result;
};

const insert = async (soldProducts) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  const values = soldProducts.map((e) => [insertId, ...Object.values(e)]);

await connection.query(
    'INSERT INTO StoreManager.sales_products (sale_id,product_id, quantity) VALUES ?',
    [values],
  );

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};