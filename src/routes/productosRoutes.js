const express = require('express');
const router = express.Router();
//const { renderCrearProducto } = require('../controllers/productoController');
let productController = require('../controllers/productoController'); 



router.get('/', productController.index)

router.get('/create', productController.create);
router.post('/create',productController.store)

router.get('/detail/:id',productController.detail);

router.get('/edit/:id', productController.edit)
router.put('/edit/:id',productController.update)

router.delete('/delete/:id', productController.destroy)


module.exports = router;






