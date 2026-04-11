const Products = require('../models/productsModel');
const asyncHaddler = require('../utils/asyncHaddler');
const BadrequestErrorHaddler = require('../errors/BadrequestErrorHaddler');
const NotFoundErrorHaddler = require('../errors/NotFoundErrorHaddler');
const statusCodes = require('http-status-codes');

//get all products
const getAllProducts = asyncHaddler(async(req,res)=>{
    res.status(200).send('Get all Products!')
})

//add products
const addProducts = asyncHaddler(async(req,res)=>{
    res.status(200).send('Add Products!')
})

//get single products
const getSingleProduct = asyncHaddler(async(req,res)=>{
    res.status(200).send('Get single Products!')
})

//update products
const updateProducts = asyncHaddler(async(req,res)=>{
    res.status(200).send('Update Products!')
})

//delete products
const deleteProducts = asyncHaddler(async(req,res)=>{
    res.status(200).send('Delete Products!')
})

module.exports = {
    getAllProducts,
    addProducts,
    getSingleProduct,
    updateProducts,
    deleteProducts
}