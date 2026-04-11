const Users = require('../models/usersModule')
const statusCodes = require('http-status-codes');
const asyncHaddler = require('../utils/asyncHaddler');
const BadrequestErrorHaddler = require('../errors/BadrequestErrorHaddler')

//user signup constroller
const userSignup = asyncHaddler(async (req,res)=>{
    const signup = await Users.create(req.body);
    if(!signup){
        throw new BadrequestErrorHaddler('User signup error!')
    }
    const token = await signup.createJWT(signup)
    if(!token){
        throw new BadrequestErrorHaddler('Token is not created')
    }
    res.status(200).json({success: true, data: signup, token: token})
})

//user signin controller
const userSignin = (req,res)=>{
    res.status(200).send('User signin')
}

module.exports = {
    userSignup,
    userSignin
}
