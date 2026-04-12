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
        products: allProducts,
        page: page,
    })
})

//add products
const addProducts = asyncHaddler(async(req,res)=>{
    await Products.create(req.body)
    res.status(statusCodes.OK).send("Product Added!")
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