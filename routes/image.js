var express = require('express');
var router = express.Router();
const imageController = require('../controllers/imageController');

/* Save Image */
router.post('/', imageController.store);

// Update Image
router.put('/:imageId', imageController.update);

// Delete an Image
router.delete('/:imageId', imageController.delete);

module.exports = router;
