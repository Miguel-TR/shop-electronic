const express = require('express');
const { renderContact } = require('../controllers/contactController');

const router = express.Router();

router.get('/contact', renderContact);

module.exports = router;