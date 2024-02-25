
const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

//mostramos todos los productos para el 'home'
router.get('/', homeController.index);

router.get('/search', homeController.search);

module.exports = router;