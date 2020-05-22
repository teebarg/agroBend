const Market = require("../models").Market;
const Image = require("../models").Image;
const Category = require("../models").Category;
const ResponseMessage = require("../helpers/response-message");
const ResponseCode = require("../helpers/response-code");
const Resp = require("../helpers/base-response");
const Joi = require("@hapi/joi");
const {
    Op
} = require("sequelize");
const Utility = require("../util/utility")

// Create and Save a new Market
exports.store = async (req, res) => {
    let response = new Resp([]);
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        address: Joi.string().required(),
        description: Joi.string().min(2).required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        categoryId: Joi.required(),
    });

    const {
        error
    } = schema.validate(req.body);
    if (error)
        return res
            .status(ResponseCode.UPROCESSABLEENTITY)
            .json(
                response.getCustom(
                    error.details[0].message,
                    ResponseCode.UPROCESSABLEENTITY
                )
            );

    // Save Market in the database
    try {
        const market = await Market.create(req.body);
        response.data = market;
        res.json(response.getSuccess());
    } catch (error) {
        res
            .status(ResponseCode.SERVERERROR)
            .json(response.getServerError(error.message));
    }
};

// Retrieve and return all market from the database.
exports.index = async (req, res) => {
    let response = new Resp([]);
    const options = {
        where: Utility.buildAnObjectFromAQuery(req.query),
        include: [ Image, Category],
    };
    try {
        const markets = await Market.findAll(options);
        const data = {
            markets: markets,
        };
        response.data = data;
        res.json(response.getSuccess());
    } catch (error) {
        res
            .status(ResponseCode.SERVERERROR)
            .json(response.getServerError(error.message));
    }
};

// Search markets from the database.
exports.search = async (req, res) => {
    let response = new Resp([]);

    const options = {
        where: Utility.buildAnObjectFromAQuery(req.query),
        include: [ Image, Category],
    };

    try {
        const markets = await Market.findAll(options);
        const data = {
            markets: markets,
        };
        response.data = data;
        res.json(response.getSuccess());
    } catch (error) {
        res
            .status(ResponseCode.SERVERERROR)
            .json(response.getServerError(error.message));
    }
};

// Find a single market with a marketId
exports.show = async (req, res) => {
    let response = new Resp([]);
    try {
        const market = await Market.findByPk(req.params.marketId, {
            include: [Image, Category],
        });
        if (!market) {
            return res
                .status(ResponseCode.NOTFOUND)
                .json(
                    response.getCustom(ResponseMessage.NOTFOUND, ResponseCode.NOTFOUND)
                );
        }
        response.data = market;
        res.send(response.getSuccess());
    } catch (error) {
        return res
            .status(ResponseCode.SERVERERROR)
            .json(response.getServerError(error.message || ResponseMessage.SERVER));
    }
};

// Update a market identified by the MarketId in the request
exports.update = async (req, res) => {
    let response = new Resp([]);

    try {
        //Update Market
        const updated = await Market.update(req.body, {
            where: {
                id: req.params.marketId,
            },
        });
        if (updated[0] == 0) {
            return res
                .status(ResponseCode.NOTFOUND)
                .json(
                    response.getCustom(ResponseMessage.NOTFOUND, ResponseCode.NOTFOUND)
                );
        }
        res.send(response.getSuccess());
    } catch (error) {
        return res
            .status(ResponseCode.SERVERERROR)
            .json(response.getServerError(error.message || ResponseMessage.SERVER));
    }
};

// Delete a market with the specified marketId in the request
exports.delete = async (req, res) => {
    let response = new Resp([]);
    try {
        const market = await Market.findByPk(req.params.marketId, {
            include: [Image],
        })
        if (!market) {
            return res
                .status(ResponseCode.NOTFOUND)
                .json(
                    response.getCustom(ResponseMessage.NOTFOUND, ResponseCode.NOTFOUND)
                );
        }
        market.Images.map(item => item.destroy());
        const result = await market.destroy();
        res.send(response.getSuccess());
    } catch (error) {
        return res
            .status(ResponseCode.SERVERERROR)
            .json(response.getServerError(error.message || ResponseMessage.SERVER));
    }
};