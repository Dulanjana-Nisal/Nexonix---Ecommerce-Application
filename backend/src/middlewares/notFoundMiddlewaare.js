const statusCodes = require('http-status-codes');

const notFoundMiddleware = (req,res,next)=>{
    res.status(statusCodes.NOT_FOUND).send('Route not found')
}

module.exports = notFoundMiddleware;