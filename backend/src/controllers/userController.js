const BadrequestErrorHaddler = require('../errors/BadrequestErrorHaddler')
const NotFoundErrorHaddler = require('../errors/NotFoundErrorHaddler')
const UnauthorizedErrorHaddler = require('../errors/UnauthorizedErrorHaddler')
const Users = require('../models/usersModule')
const asyncHaddler = require('../utils/asyncHaddler')

//get all users data
const getAllUsers = asyncHaddler(async(req,res) => {
    const {search,role,userId} = req.query

    const querySelectore = {}

    if(search){
        querySelectore.name = { $regex:search, $options: 'i' };
    }

    if(role){
        querySelectore.role = role
    }

    if(userId){
        querySelectore._id = userId
    }

    //product paging
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1)*limit

    const usersCount = await Users.find(querySelectore, {password: 0})
    const allUsers = await Users.find(querySelectore, {password: 0}).skip(skip).limit(limit)
    res.status(200).json({success: true,page: page, all_result: usersCount.length, data: allUsers})
})

//udpate users
const updateUsers = asyncHaddler(async(req,res)=>{
    const userId = req.params.id
    if("password" in req.body){
        throw new BadrequestErrorHaddler('Cant update password!')
    }
    if("_id" in req.body || "email" in req.body){
        throw new BadrequestErrorHaddler('Cant update ID or Email')
    }
    if(req.user.role !== "admin"){
        throw new UnauthorizedErrorHaddler('Not authorized')
    }
    if(!req.body.name || req.body.name === "" || !req.body.role || req.body.role === ""){
        throw new BadrequestErrorHaddler('Update values are Empty')
    }
    const updateUser = await Users.findOneAndUpdate({_id: userId}, req.body,{runValidators: true, returnDocument: 'after'})

    if(!updateUser){
        throw new NotFoundErrorHaddler('User not found!')
    }

    res.status(200).json({success: true, data: updateUser})
})

//delete users 
const deleteUsers = asyncHaddler(async(req,res)=>{
    const userId = req.params.id 
    if(req.user.role !== "admin"){
        throw new UnauthorizedErrorHaddler('Not authorized!')
    }
    const deleteUser = await Users.findOneAndDelete({_id: userId})
    if(!deleteUser){
        throw new NotFoundErrorHaddler('User not found!')
    }
    res.status(200).json({success: true, data: deleteUser})
})

module.exports = {
    getAllUsers,
    deleteUsers,
    updateUsers,
    deleteUsers
}