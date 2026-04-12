const Products = require('../models/productsModel');
const asyncHaddler = require('../utils/asyncHaddler');
const BadrequestErrorHaddler = require('../errors/BadrequestErrorHaddler');
const NotFoundErrorHaddler = require('../errors/NotFoundErrorHaddler');
const statusCodes = require('http-status-codes');

//get all products
const getAllProducts = asyncHaddler(async(req,res)=>{

    //get all product with pageing (page=page_number, limit=1)
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const skip = (page-1)*limit

    //get catoegory
    const category = req.query.category || "";

    //count all products
    const allProductCount = await Products.find();

    const allProducts = await Products
                                .find({category: category})
                                .sort({updatedAt: -1})
                                .skip(skip)
                                .limit(limit)

    res.status(statusCodes.OK).json({
        success: true,
        result_count: allProductCount.length,
        products: allProducts,
        page: page,
    })
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