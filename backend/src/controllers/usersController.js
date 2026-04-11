const Users = require('../models/usersModule')
const asyncHaddler = require('../utils/asyncHaddler');
const BadrequestErrorHaddler = require('../errors/BadrequestErrorHaddler')

//user signup constroller
const userSignup = asyncHaddler(async (req,res)=>{
    const signup = await Users.create(req.body);
    if(!signup){
        new BadrequestErrorHaddler('User signup error!')
    }
    const token = await signup.createJWT(signup)
    if(!token){
        new BadrequestErrorHaddler('Token is not created')
    }
    res.status(200).json({success: true, data: signup, token: token})
})

//user signin controller
const userSignin = asyncHaddler(async (req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        throw new BadrequestErrorHaddler('Email and Password required!')
    }
    res.status(200).send('User signin')
})

module.exports = {
    userSignup,
    userSignin
}
