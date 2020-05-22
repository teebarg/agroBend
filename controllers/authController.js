const Admin = require("../models").Admin;
const Response = require("../helpers/response");
const ResponseMessage = require("../helpers/response-message");
const ResponseCode = require("../helpers/response-code");
const Resp = require("../helpers/base-response");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../util/config");

// Login Admin
exports.login = async (req, res) => {
    let response = new Resp([]);
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
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

    // Find User in the database
    try {
        const admin = await Admin.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (admin === null) {
            return res
                .status(ResponseCode.NOTFOUND)
                .json(
                    response.getCustom(ResponseMessage.NOTFOUND, ResponseCode.NOTFOUND)
                );
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            admin.password
        );
        if (!passwordIsValid)
            return res
                .status(ResponseCode.UNAUTHORIZED)
                .json(
                    response.getCustom(
                        ResponseMessage.FAILED_LOGIN,
                        ResponseCode.UNAUTHORIZED
                    )
                );

        const token = jwt.sign({
            id: admin.id
        }, config.secret, {
            expiresIn: 86400, // expires in 24 hours
        });

        response.data = [{
            auth: true,
            token: token
        }];
        res.json(response.getSuccess());
    } catch (error) {
        res
            .status(ResponseCode.SERVERERROR)
            .json(response.getServerError(error.message));
    }
};


// Find a single user with a userId
exports.me = async (req, res) => {
    let response = new Resp([]);
    try {
        const admin = await Admin.findByPk(req.userId);
        if (!admin) {
            return res
                .status(ResponseCode.NOTFOUND)
                .json(
                    response.getCustom(ResponseMessage.NOTFOUND, ResponseCode.NOTFOUND)
                );
        }
        response.data = admin;
        res.send(response.getSuccess());
    } catch (error) {
        return res
            .status(ResponseCode.SERVERERROR)
            .json(response.getServerError(error.message || ResponseMessage.SERVER));
    }
};