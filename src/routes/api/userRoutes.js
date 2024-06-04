const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/userController');

router.get('/:id',userController.renderDetail);
router.get('/',userController.renderList);

module.exports = router;