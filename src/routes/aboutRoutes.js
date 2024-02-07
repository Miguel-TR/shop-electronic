const express = require('express');
const { renderAbout } = require('../controllers/aboutControler');

const router = express.Router();

router.get('/about', renderAbout);

module.exports = router;