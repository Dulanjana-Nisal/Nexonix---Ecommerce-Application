const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'product id is required!']
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'User id is required!']
        },
        message: {
            type: String,
            required: [true, 'Message is required!'],
            minLength: [5, 'Message must be more than 5 letters']
        },
        ratings: {
            type: Number,
            required: [true, 'Ratings is required!'],
            minLength: [0, 'Rating not be less than 0'],
            maxLength: [5, 'Rating not be more than 5']
        }
    }, {timestaamps: true}
)

module.exports = mongoose.model('Reviews', ReviewSchema);