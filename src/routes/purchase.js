const purchaseController = require('../controllers/puchaseController');
let express = require('express');
let router = express.Router();

/*** GET ALL PURCHASE ***/
router.get('/', purchaseController.list);
router.get('/:id', purchaseController.detail);
router.post('/', purchaseController.create);

module.exports = router;