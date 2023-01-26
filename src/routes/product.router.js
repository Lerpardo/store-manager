const { Router } = require('express');
const bodyParser = require('body-parser');
const { productController } = require('../controllers');

const jsonParser = bodyParser.json();
const router = Router();

// const HTTP_OK_STATUS = 200;

router.get('/search', jsonParser, productController.queryProduct);

router.get('/', jsonParser, productController.getProducts);

router.get('/:id', productController.getProductById);

router.post('/', jsonParser, productController.createNewProduct);

router.put('/:id', jsonParser, productController.updateProduct);

router.delete('/:id', jsonParser, productController.deleteProduct);

module.exports = router;
