const mongoose = require('mongoose');

const OrdersSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id is required!'],
        ref: 'users'
    },
    firstName: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [3, 'Name must be more than 3 letters']
    },
    lastName: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [3, 'Name must be more than 3 letters']
    },
    address: {
        type: String,
        required: [true, 'Address is required!'],
        minLength: [5, 'Address must be more than 5 letters']
    },
    zipCode: {
        type: String,
        required: [true, 'Zipcode is required!'],
        minLength: [5, 'Zipcode must be more than 5 letters']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required!'],
        minLength: [5, 'Phone number must be more than 5 letters']
    },
    method: {
        type: String,
        required: [true, 'Phone number is required!'],
        enum: ["cash-on-delivery", "card-payment"]
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'productId is required!'],
        ref: 'products'
    },
    productName: {
        type: String,
        required: [true, 'Product name is required!'],
        minLength: [3, 'Name must be more than 3 letters']
    },
    price: {
        type: Number,
        required: [true, 'price is required!']
    },
    status: {
        type: String,
        enum: ['Delivered','Processing','Shipped','Cancelled'],
        default: 'Processing'
    },
    image: {
        type: String,
    },
    quantity: {
        type: Number,
        required: [true, 'Orders must have quantity']
    },
    totle_price: {
        type: Number,
        required: [true, 'totle_price is required!']
    }
}, {timestamps: true})

module.exports = mongoose.model('orders', OrdersSchema);