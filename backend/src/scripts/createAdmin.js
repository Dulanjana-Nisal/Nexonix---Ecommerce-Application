const mongoose = require('mongoose')
const Users = require('../models/usersModule')
const bcrypt = require('bcryptjs')
require('dotenv').config();
const createAdmin = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)

        //check admin already in registerd
        const check = await Users.findOne({email: 'dulanjananisal67@gmail.com'})
        if(check){
            console.log('Admin already exist')
            process.exit();
        }

        //admin registation
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash("#D123u45l#", salt);
        const admin = await Users.create({
            name : "Dulanjana Nisal (Admin)",
            email:"dulanjananisal67@gmail.com",
            password: hashPassword,
            role: 'admin'
        })
        console.log(`Admin Created`, admin)
        process.exit();
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

createAdmin();