const mongoose = require('mongoose');

// user schema
const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: [3, 'User name must be more than 3 letters!']
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Please use a valid email address!'],
        unique: [true, 'Email already exist!']
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password must be more than 6 characters']
    }
})

module.exports = mongoose.model('users', UserSchema);