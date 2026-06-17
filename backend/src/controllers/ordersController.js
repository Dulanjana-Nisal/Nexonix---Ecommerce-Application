const Orders = require('../models/ordersModel');
const asyncHaddler = require('../utils/asyncHaddler');
const NotFoundErrorHaddler = require('../errors/NotFoundErrorHaddler');
const statusCodes = require('http-status-codes');
const UnauthorizedErrorHaddler = require('../errors/UnauthorizedErrorHaddler');

//get orders
const getOrders = asyncHaddler(async (req, res) => {
    const { searchByUser, searchByProduct, user, product } = req.query;
    let queryObject = {userId: req.user._id};

    //orders filter by users
    if (req.user.role === 'admin' && user) {
          queryObject.userId = user;
    }
    //orders filter seach by user
    if (searchByUser) {
        queryObject.name = { $regex: searchByUser, $options: 'i' };
    }
    //orders filter search by product
    if (searchByProduct) {
        queryObject.productName = { $regex: searchByProduct, $options: 'i' };
    }
    //oders filter by product
    if(product){
        queryObject.productId = product;
    }

    //orders paging
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit

    //get orders
    const allOrders = await Orders.find(queryObject).skip(skip).limit(limit)

    //count all orders
    const allOrdersCount = await Orders.find(queryObject);
    res.status(statusCodes.OK).json({
        success: true,
        all_result: allOrdersCount.length,
        page_result: allOrders.length,
        data: allOrders,
        page: page,
    })
})

// get all orders
const getAllOrders = asyncHaddler(async (req, res) => {
    const { searchByProduct, serchByUserId, user, product, status,limit } = req.query;
    let queryObject = {};

    //orders filter by users
    if (req.user.role === 'admin') {
        
        //orders filter search by product
        if (searchByProduct) {
            queryObject.productName = { $regex: searchByProduct, $options: 'i' };
        }
        //orders filter search by user id
        if (serchByUserId) {
            queryObject.userId = serchByUserId;
        }
        //oders filter by product
        if(product){
            queryObject.productId = product;
        }
        if(status){
            queryObject.status = status;
        }
    
        //orders paging
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit

        const allResult = await Orders.find({});
        
        //get orders
        const allOrders = await Orders.find(queryObject).skip(skip).limit(limit)
        
        //count all orders
        const allOrdersCount = await Orders.find(queryObject);
        
        if(limit === 1){
            return res.status(statusCodes.OK).json({
                success: true, 
                all_orders_result: allResult.length,
                all_result: allOrdersCount.length,
                data: allResult,
            })
        }

        res.status(statusCodes.OK).json({
            success: true,
            all_result: allOrdersCount.length, 
            page_result: allOrders.length,
            data: allOrders,
            page: page,
        })
    }
    if (req.user.role !== 'admin'){
        throw new UnauthorizedErrorHaddler('Not authorized!')
    }
})


//create orders
const createOrders = asyncHaddler(async (req, res) => {
    const createOrder = await Orders.create(req.body)
    res.status(statusCodes.CREATED).json({ success: true, data: createOrder })
})

//get single orders
const getSingleOrders = asyncHaddler(async (req, res) => {
    //get order by id
    const paremID = req.params.id;
    const singleOrder = await Orders.findOne({_id: paremID})
    if(!singleOrder){
        throw new NotFoundErrorHaddler('Order not found!')
    }
    res.status(statusCodes.OK).json({success: true, data: singleOrder})
})

//update orders
const updateOrders = asyncHaddler(async (req, res) => {
    const paremID = req.params.id; 
    const updateOrder = await Orders.findOneAndUpdate({_id: paremID},req.body,{runValidators: true, returnDocument: 'after'})
    res.status(statusCodes.OK).json({success: true, data: updateOrder})
})

//delete orders
const deleteOrders = asyncHaddler(async (req, res) => {
    const paremID = req.params.id;
    const deleteOrder = await Orders.findOneAndDelete({_id: paremID})
    if(!deleteOrder){
        throw new NotFoundErrorHaddler('Product not found!');
    }
    res.status(200).json({success: true, message: `${deleteOrder._id} is deleted!`})
})

module.exports = {
    getOrders,
    getAllOrders,
    createOrders,
    getSingleOrders,
    updateOrders,
    deleteOrders
}