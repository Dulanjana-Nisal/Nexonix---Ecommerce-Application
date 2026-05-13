const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Product id is required!']
    },
    name: {
        type: String,
        required: [true, 'Item name is required!'],
        minLength: [3, 'Item name must be more than 3 letters!'] 
    },
    quantity: {
        type: Number,
        default: 1,
    },
    availability: {
        type: Boolean,
        required: [true, 'Availability is required!']
    },
    stock: {
        type: Number,
        required: [true, 'Stock Count is required!']
    },
    price: {
        type: Number,
        required: [true, 'Item price is required!']
    },
    image: {
        type: String
    }
}, {timestamps: true})

const CartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'userId is required!']
    },

    items: [cartItemSchema],
    totle_items: {
        type: Number,
        default: 0
    }
})

CartSchema.pre('findOneAndUpdate', function(){
   
})

module.exports = mongoose.model('carts', CartSchema);  