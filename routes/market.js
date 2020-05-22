var express = require('express');
var router = express.Router();
const marketController = require('../controllers/marketController');

/* GET markets listing. */
router.get('/', marketController.index);

// Create a new Market
router.post('/', marketController.store);

// Retrieve a single Market with marketId
router.get('/:marketId', marketController.show);

// Update a Market with marketId
router.put('/:marketId', marketController.update);

// Delete a Market with marketId
router.delete('/:marketId', marketController.delete);

module.exports = router;
