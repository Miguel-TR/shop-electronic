const express = require('express');
const { renderLogin, renderRegister } = require('../controllers/loginController');
const router = express.Router();

router.get('/login', renderLogin);

router.get('/register', renderRegister);
module.exports = router;