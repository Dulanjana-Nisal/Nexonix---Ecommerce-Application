const UnauthorizedErrorHaddler = require('../errors/UnauthorizedErrorHaddler')

function verifyAdminMiddleware(req,res,next){
    //check if atherization is done!
    if(!req.user.role){
        throw new UnauthorizedErrorHaddler('User Athorized Faild!')
    }

    //check role
    if(req.user.role !== 'admin'){
        throw new UnauthorizedErrorHaddler('Admin Athorized Faild!')
    }

    next()
}

module.exports = verifyAdminMiddleware;