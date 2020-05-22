const ResponseMessage = require('./response-message');
const ResponseCode = require('./response-code');

class BaseResponse {

    constructor(data) { this.data = data }
    getSuccess() {
        return new template(this.data, ResponseMessage.SUCCESS, ResponseCode.SUCCESS);
    }

    getNotFound() {
        return new template(this.data, ResponseMessage.NOTFOUND, ResponseCode.NOTFOUND);
    }

    getServerError(message) {
        return new template(this.data, message ? message : ResponseMessage.SERVER, ResponseCode.SERVERERROR);
    }

    getCustom(message, code) {
        return new template(this.data, message, code);
    }

}

function template(data, message, code) {
    this.data = data;
    this.message = message;
    this.code = code;
}

module.exports = BaseResponse;