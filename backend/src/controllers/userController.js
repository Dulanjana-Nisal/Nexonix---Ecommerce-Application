const Users = require('../models/usersModule')

const getAllUsers = async(req,res) => {
    const allUsers = await Users.find({})
    res.status(200).json({success: true, data: allUsers})
}

module.exports = {
    getAllUsers
}