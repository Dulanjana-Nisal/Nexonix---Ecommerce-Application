const mongoose = require('mongoose');

const NotifictionSchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User id is required! This can filter what user can display notifications']
    },
    type: {
        type: String,
        enum: ['orders','products','users'],
        required: [true, 'Notification must have type']
    },
    receiver: {
        type: String,
        enum: ['admin','user'],
        required: [true, 'Notification must have type']
    },
    title: {
        type: String,
        minLength: [5, 'Title must have more than 5 letters'],
        required: [true, 'Notification Title is required!'],
    },
    message: {
        type: String,
        minLength: [5, 'Message must have more than 5 letters'],
        required: [true, 'Notification message is required!'],
    },
    isread: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('notifications', NotifictionSchema)