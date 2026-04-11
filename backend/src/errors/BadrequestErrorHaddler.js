const CustomErrorHaddler = require("./CustomErrorHaddler");
const statusCodes = require('http-status-codes');

class BadrequestErrorHaddler extends CustomErrorHaddler{
    constructor(message){
        super(message)
        this.status = statusCodes.BAD_REQUEST
        this.code = "BAD_REQUEST"
    }
}

module.exports = BadrequestErrorHaddler;