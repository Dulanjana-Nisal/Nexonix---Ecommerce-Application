const Products = require('../models/productsModel');
const asyncHaddler = require('../utils/asyncHaddler');
const BadrequestErrorHaddler = require('../errors/BadrequestErrorHaddler');
const NotFoundErrorHaddler = require('../errors/NotFoundErrorHaddler');
const statusCodes = require('http-status-codes');

//get all products
const getAllProducts = asyncHaddler(async(req,res)=>{

    const {search,category,availability,sortBy,brand,select,pr,rr} = req.query;
    let queryObject = {}; 

    //products filter by serach
    if(search){
        queryObject.name = { $regex:search, $options: 'i' };
    }
    //product filter by brand
    if(brand){
        queryObject.brand = brand;
    }
    //product filter by category
    if(category){
        queryObject.category = category;

    }
    //product filter by availability
    if(availability){
        queryObject.availability = availability==='false' ? false : true;
    }
    //products filters by rangers price
    if(pr){
        const values = pr.split('-')
        const maxValue = Number(values[0]) 
        const minValue = Number(values[1])
        queryObject.price = {$gte: maxValue,$lte: minValue}
    }   
    if(rr){
        const values = rr.split('-')
        const maxValue = Number(values[0]) 
        const minValue = Number(values[1])
        queryObject.ratings = {$gte: maxValue,$lte: minValue}
    }

    //product paging
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1)*limit

    const result = Products.find(queryObject);
    //product sortby price
    if(sortBy){
        if(sortBy === 'low_to_high'){
            result.sort({price: 1})
        }
        if(sortBy === 'high_to_low'){
            result.sort({price: -1})
        }
    }
    //product selecttions
    if(select){
        const selectValues = select.split(',').join(' ')
        result.select(selectValues)
    }

    //get products
    const allProducts = await result.skip(skip).limit(limit)

    //count all products
    const allProductCount = await Products.find(queryObject);
    res.status(statusCodes.OK).json({
        success: true,
        all_result: allProductCount.length,
        page_result: allProducts.length,
        data: allProducts,
        page: page,
    })
})

//add products
const addProducts = asyncHaddler(async(req,res)=>{
    const createProducts = await Products.create(req.body)
    res.status(statusCodes.CREATED).json({success: true, data: createProducts})
})

//get single products
const getSingleProduct = asyncHaddler(async(req,res)=>{
    //get product by id
    const paremID = req.params.id;
    const singleProduct = await Products.findOne({_id: paremID})
    if(!singleProduct){
        throw new NotFoundErrorHaddler('Product not found!')
    }
    res.status(statusCodes.OK).json({success: true, data: singleProduct})
})

//products Recommendations
const recommendProducts = asyncHaddler(async(req,res)=>{
    const paremID = req.params.id; 
    const getProductDetails = await Products.findOne({_id: paremID});
    const productCategory = getProductDetails.category;
    const productPrice = getProductDetails.price;

    let priceRange = 10; 
    if(0 < productPrice < 10){
        priceRange = 1
    }
    if(10 < productPrice < 100){
        priceRange = 10
    }
    if(100 < productPrice < 1000){
        priceRange = 100
    }
    if(1000 < productPrice < 10000){
        priceRange = 1000
    }
    console.log(productPrice)
    console.log(priceRange)
    const productRecomendation = await Products.find({
        category: productCategory,
        price: {
            $gte: productPrice-priceRange,
            $lte: productPrice+priceRange
        }
    }).limit(10)
    res.status(200).json({success: true, all_result: productRecomendation.length, data: productRecomendation})
})

//update products
const updateProducts = asyncHaddler(async(req,res)=>{
    const paremID = req.params.id; 
    if(req.body.stock === 0){
        req.body.availability = false
    }
    if(req.body.stock !== 0 || req.body.availability === true){
        req.body.availability = true
    }
    console.log(req.body.stock)
    console.log(req.body.availability)
    const updateProduct = await Products.findOneAndUpdate({_id: paremID},req.body,{runValidators: true, returnDocument: 'after'})
    res.status(statusCodes.OK).json({success: true, data: updateProduct})
})

//delete products
const deleteProducts = asyncHaddler(async(req,res)=>{
    const paremID = req.params.id;
    const deleteProduct = await Products.findOneAndDelete({_id: paremID})
    if(!deleteProduct){
        throw new NotFoundErrorHaddler('Product not found!');
    }
    res.status(200).json({success: true, message: `${deleteProduct.name} is deleted!`})
})

module.exports = {
    getAllProducts,
    addProducts,
    getSingleProduct,
    recommendProducts,
    updateProducts,
    deleteProducts
}