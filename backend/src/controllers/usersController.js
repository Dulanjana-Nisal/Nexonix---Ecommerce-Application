const Users = require('../models/usersModule')
const statusCodes = require('http-status-codes');

//user signup constroller
const userSignup = async (req,res)=>{
    try{
        const signup = await Users.create(req.body)
        res.status(200).send('User signup')
    }
    catch(err){
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({success: false, messaage: err})
    }
}


//user signin controller
const userSignin = (req,res)=>{
    res.status(200).send('User signin')
}

module.exports = {
    userSignup,
    userSignin
}
