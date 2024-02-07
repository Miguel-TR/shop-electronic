const express = require('express');
const { renderProductDetail } = require('../controllers/productDetailControler');

const router = express.Router();

router.get('/detailProduct', renderProductDetail);

module.exports = router;