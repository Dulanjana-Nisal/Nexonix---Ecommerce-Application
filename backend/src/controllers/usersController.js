const Users = require('../models/usersModule')
const statusCodes = require('http-status-codes');
const asyncHaddler = require('../utils/asyncHaddler');

//user signup constroller
const userSignup = asyncHaddler(async (req,res)=>{
    const signup = await Users.create(req.body)
    res.status(200).json({success: true, data: signup})
})


//user signin controller
const userSignin = (req,res)=>{
    res.status(200).send('User signin')
}

module.exports = {
    userSignup,
    userSignin
}
