var express = require('express');
var router = express.Router();
const marketController = require('../controllers/authController');
const VerifyToken = require('../middlewares/auth');

/* Admin Login */
router.post('/login', marketController.login);

// Get Logged in User
router.get('/me', VerifyToken, marketController.me);


module.exports = router;
