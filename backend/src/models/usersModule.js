const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// user schema
const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'User name must be more than 3 letters!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Please use a valid email address!'],
        unique: [true, 'Email already exist!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be more than 6 characters'],
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }
})

//hashing password
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(this.password, salt)
    this.password = hashpassword;
})

UserSchema.methods.createJWT = function(userData){
    return jwt.sign({id: userData._id, name: userData.name, email: userData.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
}

module.exports = mongoose.model('users', UserSchema);