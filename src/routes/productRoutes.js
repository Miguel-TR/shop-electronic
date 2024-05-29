const express = require('express');
const router = express.Router();
//const { renderCrearProducto } = require('../controllers/productoController');
let productController = require('../controllers/productController');
const rememberUserMiddleware = require('../middlewares/rememberUserMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const upload = require('../middlewares/userAvatar');


router.get('/', rememberUserMiddleware, productController.index)

router.get('/search', productController.search);

router.get('/create', rememberUserMiddleware, productController.create);
router.post('/create', upload.single('img'), rememberUserMiddleware, productController.store);

router.get('/detail/:id', rememberUserMiddleware, guestMiddleware, productController.detail);

router.get('/edit/:id', rememberUserMiddleware, guestMiddleware, productController.edit);
router.put('/edit/:id', upload.single('img'), rememberUserMiddleware, guestMiddleware, productController.update);

router.delete('/delete/:id', rememberUserMiddleware, guestMiddleware, productController.destroy);


module.exports = router;






