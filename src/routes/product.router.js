const { Router } = require('express');

const { productController } = require('../controllers');

const router = Router();

// const HTTP_OK_STATUS = 200;

router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById);

module.exports = router;
