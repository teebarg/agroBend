var express = require('express');
var router = express.Router();
const marketController = require('../controllers/authController');
const VerifyToken = require('../middlewares/auth');

/* Admin Login */
router.post('/login', marketController.login);

// Create a new Market
router.get('/me', VerifyToken, marketController.me);

// // Retrieve a single Market with marketId
// router.get('/:marketId', marketController.show);

// // Update a Market with marketId
// router.put('/:marketId', marketController.update);

// // Delete a Market with marketId
// router.delete('/:marketId', marketController.delete);

module.exports = router;
