const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required!'],
        minLength: [3, 'Product name must be more than 3 letters!']
    },
    image: {
        type: String
    },
    stock: {
        type: Number,
        required: [true, 'stock value is required!']
    },
    price: {
        type: Number,
        required: [true, 'Product must have a price']
    },
    ratings: {
        type: Number,
        minLength: [0, 'Rating not be less than 0'],
        maxLength: [5, 'Rating not be more than 5'],
        default: 0
    },
    description: {
        type: String,
        required: [true, 'Product have a description'],
        minLength: [5, 'Description must be more than 5 letters']
    },
    keywords: {
        type: [String],
        enum: ['wireless','gaming','computer','desktop','laptop','hardware','mouse','keyboard','RGB','external','portable','speed','storage','streaming','USB'],
        required: [true, 'products keywords in required']
    },
    category: {
        type: String,
        enum: ['computers','laptops','components','gamings','softwares'],
        required: [true, 'Product category is required for each products']
    },
    brand: {
        type: String
    },
    availability: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

module.exports = mongoose.model('products', ProductsSchema);