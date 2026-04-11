const Users = require('../models/usersModule')
const asyncHaddler = require('../utils/asyncHaddler');
const BadrequestErrorHaddler = require('../errors/BadrequestErrorHaddler');
const NotFoundErrorHaddler = require('../errors/NotFoundErrorHaddler');

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
    res.status(201).json({success: true, data: signup, token: token})
})

//user signin controller
const userSignin = asyncHaddler(async (req,res)=>{
    const {email,password} = req.body

    //check user is registerd
    const signin = await Users.findOne({email: email})
    if(!signin){
        throw new NotFoundErrorHaddler('User not Found!')
    }

    //make sure email and password not empty spaces
    if(!email || !password){
        throw new BadrequestErrorHaddler('Email and Password required!')
    }
    //check password is correct
    const checkPass = await signin.decodePassword(password)
    if(!checkPass){
        throw new BadrequestErrorHaddler('Invalid Password!')
    }

    res.status(200).json(req.user)
})

module.exports = {
    userSignup,
    userSignin
}
