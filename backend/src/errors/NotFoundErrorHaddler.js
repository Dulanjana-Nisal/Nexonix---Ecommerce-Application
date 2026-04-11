const CustomErrorHaddler = require("./CustomErrorHaddler");
const statusCodes = require('http-status-codes');

class NotFoundErrorHaddler extends CustomErrorHaddler{
    constructor(message){
        super(message)
        this.status = statusCodes.NOT_FOUND
        this.code = "NOT_FOUND"
    }
}

module.exports = NotFoundErrorHaddler;