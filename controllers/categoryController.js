const Category = require('../models').Category;
const ResponseCode = require('../helpers/response-code');
const Resp = require('../helpers/base-response');

// Retrieve and return all categories.
exports.index = async (req, res) => {
    let response = new Resp([]);
    try {
        const categories = await Category.findAll();
        const data = {
            categories
        }
        response.data = data;
        res.json(response.getSuccess());
    } catch (error) {
        res.status(ResponseCode.SERVERERROR).json(response.getServerError(error.message));
    }
};