// const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
    const [result] = await connection.execute(
        'SELECT * FROM  StoreManager.products',
    );
    return result;
};

module.exports = {
  findAll,
};