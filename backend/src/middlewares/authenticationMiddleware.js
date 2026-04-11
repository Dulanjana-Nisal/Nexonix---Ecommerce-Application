const BadrequestErrorHaddler = require("../errors/BadrequestErrorHaddler");
const UnauthorizedErrorHaddler = require('../errors/UnauthorizedErrorHaddler')
const jwt = require('jsonwebtoken');

const authenticationMiddleware  = (req,res,next)=>{
    const author = req.headers.authorization
    const token = author.split(' ')[1]

    //check token brokens
    if(!token || !author.startsWith('Bearer ')){
        throw new BadrequestErrorHaddler('Token Error')
    }
    //veryfi token
    const user = jwt.verify(token, process.env.JWT_SECRET)

    if(!user){
        throw new UnauthorizedErrorHaddler('User Athorized Faild!')
    }
    req.user = user;
    next();
}

module.exports = authenticationMiddleware;