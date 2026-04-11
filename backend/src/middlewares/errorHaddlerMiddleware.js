const statusCodes = require('http-status-codes');

const errorHaddlerMiddleware = (err,req,res,next)=>{
    if(err){
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({sucess: false, message: 'Error!'})
    }
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({sucess: false, message: 'INTERNAL_SERVER_ERROR'})
}

module.exports = errorHaddlerMiddleware;