const Users = require('../models/usersModule')
const asyncHaddler = require('../utils/asyncHaddler');
const BadrequestErrorHaddler = require('../errors/BadrequestErrorHaddler');
const NotFoundErrorHaddler = require('../errors/NotFoundErrorHaddler');
const statusCodes = require('http-status-codes');
require('dotenv').config()

//user signup constroller
const userSignup = asyncHaddler(async (req,res)=>{
    if(req.body.email === process.env.ADMIN_EMAIL){
        req.body.role = 'admin'
    }
    const signup = await Users.create(req.body);
    if(!signup){
        throw new BadrequestErrorHaddler('User signup error!')
    }
    const token = await signup.createJWT(signup)
    if(!token){
        throw new BadrequestErrorHaddler('Token is not created')
    }
    res.status(statusCodes.CREATED).json({success: true, data: signup, token: token})
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
    const token = await signin.createJWT(signin)
    res.status(statusCodes.OK).json({success: true, user: {_id: signin._id, name: signin.name, email: signin.email, role: signin.role}, token: token})
})

//delete users
const deleteUsers = asyncHaddler(async(req,res)=>{
    const userId = req.params.id;
    const deleteUser = await Users.findOneAndDelete({_id: userId})

    if(!deleteUser){
        throw new NotFoundErrorHaddler('User not found')
    }
    res.status(statusCodes.OK).json({success: true, message: `${userId} user is deleted`})
})

module.exports = {
    userSignup,
    userSignin,
    deleteUsers
}
