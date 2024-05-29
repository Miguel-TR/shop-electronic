const express = require('express');
const router = express.Router();

let productController = require('../controllers/productController');
const rememberUserMiddleware = require('../middlewares/rememberUserMiddleware');

router.get('/', rememberUserMiddleware, productController.index)


module.exports = router;