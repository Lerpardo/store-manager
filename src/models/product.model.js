const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
    const [result] = await connection.execute(
        'SELECT * FROM drivers',
    );
    return camelize(result);
};

module.exports = {
  findAll,
};