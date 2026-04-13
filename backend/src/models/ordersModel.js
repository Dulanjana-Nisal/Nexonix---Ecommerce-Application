const mongoose = require('mongoose');

const OrdersSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id is required!'],
        ref: 'users'
    },
    name: {
        type: String,
        required: [true, 'Order must have a name!'],
        minLength: [3, 'Name must be more than 3 letters']
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'productId is required!'],
        ref: 'products'
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