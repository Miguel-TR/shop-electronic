const express = require('express');
const { renderCrearProducto } = require('../controllers/productoController');

const router = express.Router();

router.get('/crear-producto',renderCrearProducto);

module.exports = router;