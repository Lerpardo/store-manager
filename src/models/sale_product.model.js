const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT 
    s.id as saleId,
    s.date as date,
    sp.product_id as productId,
    sp.quantity as quantity
    FROM StoreManager.sales as s
    INNER JOIN StoreManager.sales_products as sp ON s.id = sp.sale_id;`,
  );
  return result;
};

const findById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT 
    s.date as date,
    sp.product_id as productId,
    sp.quantity as quantity
    FROM StoreManager.sales as s
    INNER JOIN StoreManager.sales_products as sp ON s.id = sp.sale_id
    WHERE s.id = ?
    ;`, [saleId],
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

const delProc = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  return result;
};

module.exports = {
  delProc,
  findAll,
  findById,
  insert,
};