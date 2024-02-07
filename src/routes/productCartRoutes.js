const express = require('express');
const { renderProductCart } = require('../controllers/productCartController');
const router = express.Router();

router.get('/carrito-de-compras', renderProductCart);


module.exports = router;