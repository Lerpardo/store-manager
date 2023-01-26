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

  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id,product_id, quantity) VALUES ?',
    [values],
  );

  return insertId;
};

const update = async (newSaleProduct, id) => {
  await newSaleProduct
    .map((e) => connection.execute(
      'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;',
      [e.quantity, id, e.productId],
    ));
  return id;
};

const delProc = async (id) => {
 await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  return id;
};

module.exports = {
  delProc,
  update,
  findAll,
  findById,
  insert,
};