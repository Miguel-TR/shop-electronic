const express = require('express');
const { renderCrearProducto } = require('../controllers/productoController');
const productController = require('../controllers/productoController'); 

const router = express.Router();

router.get('/crear-producto',renderCrearProducto);

router.get('/detalle/:id',productController.renderProductDetails);

module.exports = router;






