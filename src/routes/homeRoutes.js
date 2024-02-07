const express = require('express');
const { renderHome, renderAbout } = require('../controllers/homeControler');

const router = express.Router();

router.get('', renderHome);

module.exports = router;