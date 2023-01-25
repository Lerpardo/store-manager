const { Router } = require('express');
const bodyParser = require('body-parser');
const { saleProductController } = require('../controllers');

const jsonParser = bodyParser.json();
const router = Router();

// const HTTP_OK_STATUS = 200;

router.get('/', jsonParser, saleProductController.getSales);

router.post('/', jsonParser, saleProductController.createNewSale);

module.exports = router;