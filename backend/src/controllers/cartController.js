const Cart = require('../models/cartModel')
const asyncHaddler = require('../utils/asyncHaddler');
const NotFoundErrorHaddler = require('../errors/NotFoundErrorHaddler');
const BadrequestErrorHaddler = require('../errors/BadrequestErrorHaddler');
const statusCodes = require('http-status-codes');

//get all cart items
const getAllCartItems = asyncHaddler(async (req, res) => {
    const { availability } = req.query;

    let queryObject = {};
    //Cart items filter by product
     if(availability){
        queryObject.availability = availability==='false' ? false : true;
    }
    //Cart items paging
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit

    //get Cart items
    const allCartItems = await Cart.find(queryObject).skip(skip).limit(limit)

    //count all Cart items
    const allCartItemsCount = await Cart.find(queryObject);

    res.status(statusCodes.OK).json({
        success: true,
        all_result: allCartItemsCount.length,
        page_result: allCartItems.length,
        data: allCartItems,
        page: page,
    })
}) 

//create Cart items
const createCartItems = asyncHaddler(async (req, res) => {
    //check cart is already create
    req.body.userId = req.user._id;
    const itemCart = await Cart.findOne({userId: req.user._id})
    //check product is already exsist
    const checkProducts = await Cart.findOne({userId:req.body.userId,  "items.productId": req.body.items.productId})
    let result = Cart
    if(itemCart){
        if(checkProducts){
            throw new BadrequestErrorHaddler('Product already in cart!')
        }
        result =  result.updateOne(
            {userId: req.user._id},
            {
                $push: {
                    items: req.body.items
                },
            }
        )
    }
    else{
        result = result.create(req.body)
    }
    const createCart = await result;
    res.status(statusCodes.CREATED).json({success: true, message: createCart})

})

//get single Cart items
const getSingleCartItem = asyncHaddler(async (req, res) => {
    //get order by id
    const paremID = req.params.id;
    const singleCartItem = await Cart.findOne({_id: paremID})
    if(!singleCartItem){
        throw new NotFoundErrorHaddler('Order not found!')
    }
    res.status(statusCodes.OK).json({success: true, data: singleCartItem})
})

//update Cart items
const updateCartItems = asyncHaddler(async (req, res) => {
    const paremID = req.params.id; 
        const updateCartItem = await Cart.findOneAndUpdate({_id: paremID},req.body,{runValidators: true, returnDocument: 'after'})
        res.status(statusCodes.OK).json({success: true, data: updateCartItem})
})

//delete Cart items
const deleteCartItems = asyncHaddler(async (req, res) => {
    const paremID = req.params.id;
    const deleteCartItem = await Cart.findOneAndDelete({items: [{_id: paremID}]})
    if(!deleteCartItem){
        throw new NotFoundErrorHaddler('Product not found!');
    }
    res.status(200).json({success: true, message: `${deleteCartItem._id} is deleted!`})
})

module.exports = {
    getAllCartItems,
    createCartItems,
    getSingleCartItem,
    updateCartItems,
    deleteCartItems
}