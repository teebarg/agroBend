var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/categoryController');

/* Get Categories */
router.get('/', categoryController.index);

module.exports = router;
