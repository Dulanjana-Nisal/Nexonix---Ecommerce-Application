const Orders = require('../models/ordersModel');
const asyncHaddler = require('../utils/asyncHaddler');
const BadrequestErrorHaddler = require('../errors/BadrequestErrorHaddler');
const NotFoundErrorHaddler = require('../errors/NotFoundErrorHaddler');
const statusCodes = require('http-status-codes');

//get all orders
const getAllOrders = asyncHaddler(async(req,res)=>{
    res.status(statusCodes.OK).send('Get all orders')
})

//create orders
const createOrders = asyncHaddler(async(req,res)=>{
    res.status(statusCodes.OK).send('Create orders')
})

//get single orders
const getSingleOrders = asyncHaddler(async(req,res)=>{
    res.status(statusCodes.OK).send('Get Single orders')
})

//update orders
const updateOrders = asyncHaddler(async(req,res)=>{
    res.status(statusCodes.OK).send('Update orders')
})

//delete orders
const deleteOrders = asyncHaddler(async(req,res)=>{
    res.status(statusCodes.OK).send('Delete orders')
})

module.exports = {
    getAllOrders,
    createOrders,
    getSingleOrders,
    updateOrders,
    deleteOrders
}