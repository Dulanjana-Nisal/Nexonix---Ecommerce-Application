const statusCodes = require('http-status-codes');

const errorHaddlerMiddleware = (err,req,res,next)=>{
    let customErrors = {
        message: err.message || 'Server is not responding...',
        status: err.status || statusCodes.INTERNAL_SERVER_ERROR,
        code: err.code || 'INTERNAL_SERVER_ERROR'
    }

    if(err.name === "ValidationError"){
        customErrors.message = err.message,
        customErrors.status = statusCodes.BAD_REQUEST,
        customErrors.code = 'ValidationError'
    }
    
    else if(err.cause.code === 11000){
        customErrors.message = 'Email is already exist!',
        customErrors.status = statusCodes.BAD_REQUEST,
        customErrors.code = 'BAD_REQUEST'
    } 

    res.status(customErrors.status).json({
        success: false,
        message: customErrors.message,
        errors: {
            code: customErrors.code,
        }
    })
}

module.exports = errorHaddlerMiddleware;