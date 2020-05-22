const  ResponseCodes = Object.freeze({
    SUCCESS: 200,
    NOTFOUND: 404,
    BADREQUEST: 400,
    UNAUTHORIZED: 401,
    UPROCESSABLEENTITY: 422,
    SERVERERROR: 500,
});

module.exports = ResponseCodes;