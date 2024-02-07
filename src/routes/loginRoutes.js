const express = require('express');
const { renderLogin, renderRegister } = require('../controllers/loginController');
const router = express.Router();

router.get('/iniciar-sesion', renderLogin);

router.get('/crear-cuenta', renderRegister);
module.exports = router;