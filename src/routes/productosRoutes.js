const express = require('express');
const { renderCrearProducto } = require('../controllers/productoController');
let productController = require('../controllers/productoController'); 

const router = express.Router();

router.get('/', productController.index)

router.get('/create', productController.create);
router.post('/create',productController.store)

router.get('/detail/:id',productController.detail);

//router.get('/edit/:id', productController)
//router.get('/edit/:id',productController)

//router.get('/delete/:id', productController)


module.exports = router;






