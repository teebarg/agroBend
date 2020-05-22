const Image = require("../models").Image;
const ResponseMessage = require("../helpers/response-message");
const ResponseCode = require("../helpers/response-code");
const Resp = require("../helpers/base-response");
const Joi = require("@hapi/joi");
var AWS = require('aws-sdk');
var S3 = require('../helpers/s3Model');
const Utility = require('../util/utility');

// Configure AWS with your access and secret key.
const {
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    AWS_REGION
} = process.env;

AWS.config.update({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: AWS_REGION
});
var s3Bucket = new AWS.S3();

// Create and Save a new Market
exports.store = async (req, res) => {
    let response = new Resp([]);
    const schema = Joi.object({
        image: Joi.required(),
        marketId: Joi.number().required(),
    });

    const {
        error
    } = schema.validate(req.body);
    if (error) return res.status(ResponseCode.UPROCESSABLEENTITY).json(response.getCustom(error.details[0].message, ResponseCode.UPROCESSABLEENTITY));

    const imgName = Math.ceil(Date.now() + Math.random()) + '.jpg';
    const path = `agro/${imgName}`
    const buffedImage = Utility.getImageFromBase64(req.body.image);

    const data = new S3(path, buffedImage);
    s3Bucket.putObject(data, async (err, data) => {
        if (err) {
            console.log(err);
            res.status(ResponseCode.SERVERERROR).json(response.getCustom(data, ResponseCode.SERVERERROR));
        } else {
            // Save User in the database
            try {
                const image = await Image.create({
                    image: imgName,
                    marketId: req.body.marketId
                });
                response.data = image;
                res.json(response.getSuccess());
            } catch (error) {
                res.status(ResponseCode.SERVERERROR).json(response.getServerError(error.message));
            }
        }
    });
};


// Find a single user with a userId
exports.update = async (req, res) => {
    let response = new Resp([]);
    try {
        const image = await Image.findByPk(req.params.imageId);
        // const market = await Market.findByPk(req.params.marketId);
        if (!image) {
            return res
                .status(ResponseCode.NOTFOUND)
                .json(
                    response.getCustom(ResponseMessage.NOTFOUND, ResponseCode.NOTFOUND)
                );
        }

        const imgName = Math.ceil(Date.now() + Math.random()) + '.jpg';
        const path = `agro/${imgName}`
        const buffedImage = Utility.getImageFromBase64(req.body.image);

        const data = new S3(path, buffedImage);
        s3Bucket.putObject(data, async (err, data) => {
            if (err) {
                console.log(err);
                res.status(ResponseCode.SERVERERROR).json(response.getCustom(data, ResponseCode.SERVERERROR));
            } else {
                // Save User in the database
                try {
                    const updated = await Image.update({image: imgName}, {
                        where: {
                            id: req.params.imageId
                        }
                    });
                    response.data = image;
                    res.json(response.getSuccess());
                } catch (error) {
                    res.status(ResponseCode.SERVERERROR).json(response.getServerError(error.message));
                }
            }
        });
    } catch (error) {
        return res
            .status(ResponseCode.SERVERERROR)
            .json(response.getServerError(error.message || ResponseMessage.SERVER));
    }
};

// Delete an image with the specified imageId in the request
exports.delete = async (req, res) => {
    let response = new Resp([]);
    try {
        const image = await Image.findByPk(req.params.imageId)
        if (!image) {
            return res
                .status(ResponseCode.NOTFOUND)
                .json(
                    response.getCustom(ResponseMessage.NOTFOUND, ResponseCode.NOTFOUND)
                );
        }
        const result = await image.destroy();
        res.send(response.getSuccess());
    } catch (error) {
        return res
            .status(ResponseCode.SERVERERROR)
            .json(response.getServerError(error.message || ResponseMessage.SERVER));
    }
};
