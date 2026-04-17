const mongoose = require('mongoose');

const NotifictionSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['orders','products'],
        required: [true, 'Notification must have type']
    },
    message: {
        type: String,
        required: [true, 'Notification message is required!'],
    },
    isread: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('notifications', NotifictionSchema)