const statusCodes = require('http-status-codes');

const errorHaddlerMiddleware = (err,req,res,next)=>{
    let customErrors = {
        message: err.message || 'Server is not responding...',
        status: err.status || statusCodes.INTERNAL_SERVER_ERROR,
        code: err.code || 'INTERNAL_SERVER_ERROR'
    }
    
    //check validation errors
    if(err.name === "ValidationError"){

        const validationErr = err.errors.name || err.errors.email || err.errors.password; 

        customErrors.message = validationErr.message,
        customErrors.status = statusCodes.BAD_REQUEST,
        customErrors.code = 'BAD_REQUEST'
    }    

    //check reference errors
    else if(err.name === "ReferenceError"){
        customErrors.message = err.message,
        customErrors.status = statusCodes.BAD_REQUEST,
        customErrors.code = 'BAD_REQUEST'
    } 

    //check type error
    else if(err.name === "TypeError"){
        customErrors.message = err.message,
        customErrors.status = statusCodes.BAD_REQUEST,
        customErrors.code = 'BAD_REQUEST'
    } 

    //check dupicate errors
    try{
        if(err.cause.code === 11000){
            customErrors.message = 'Email is already exist!',
            customErrors.status = statusCodes.BAD_REQUEST,
            customErrors.code = 'BAD_REQUEST'
        } 

    }
    catch(err){}

    res.status(customErrors.status).json({
        success: false,
        message: customErrors.message,
        errors: {
            code: customErrors.code,
        }
    })
}

module.exports = errorHaddlerMiddleware;