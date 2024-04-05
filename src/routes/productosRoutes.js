const express = require('express');
const router = express.Router();
//const { renderCrearProducto } = require('../controllers/productoController');
let productController = require('../controllers/productoController'); 
const rememberUserMiddleware = require('../middlewares/rememberUserMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');



router.get('/',rememberUserMiddleware,guestMiddleware ,productController.index)

router.get('/create',rememberUserMiddleware,guestMiddleware  ,productController.create);
router.post('/create',rememberUserMiddleware,guestMiddleware ,productController.store)

router.get('/detail/:id',rememberUserMiddleware,guestMiddleware ,productController.detail);

router.get('/edit/:id', rememberUserMiddleware,guestMiddleware ,productController.edit)
router.put('/edit/:id',rememberUserMiddleware,guestMiddleware ,productController.update)

router.delete('/delete/:id',rememberUserMiddleware,guestMiddleware  ,productController.destroy)


module.exports = router;






