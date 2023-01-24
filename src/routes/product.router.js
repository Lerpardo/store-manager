const { Router } = require('express');
const bodyParser = require('body-parser');
const { productController } = require('../controllers');

const jsonParser = bodyParser.json();
const router = Router();

// const HTTP_OK_STATUS = 200;

router.get('/', jsonParser, productController.getProducts);

router.get('/:id', productController.getProductById);

router.post('/', jsonParser, productController.createNewProduct);

module.exports = router;
