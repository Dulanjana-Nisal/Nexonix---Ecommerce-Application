const Notification = require('../models/notificationModel');
const asyncHaddler = require('../utils/asyncHaddler');
const NotFoundErrorHaddler = require('../errors/NotFoundErrorHaddler');
const statusCodes = require('http-status-codes');

//get all Notifications
const getAllNotifications = asyncHaddler(async (req, res) => {
    const {type,status,limit} = req.query
    let queryObject = {};

    //filter by type
    if(type){
        queryObject.type = type
    }

    //filter by status
    if(status){
        queryObject.isread = status == 'false' ? false : true
    }

    const notificationLimit = limit || 10;
    const getAllNotification = await Notification.find(queryObject).limit(notificationLimit) 
    res.status(statusCodes.OK).json({success: true, notification_count: getAllNotification.length, data: getAllNotification})
})

//create nofidcations
const addNotifications = asyncHaddler(async (req, res) => {
    const addNotifications = await Notification.create(req.body)
    res.status(statusCodes.CREATED).json({success: true, data: addNotifications})
})

//get single notification
const getSingleNotification = asyncHaddler(async (req, res) => {
    const paramId = req.params.id;
    const singleNotification = await Notification.find({_id: paramId})

    if(!singleNotification || singleNotification.length == 0){
        throw new NotFoundErrorHaddler('Notification not found!')
    }
   res.status(statusCodes.OK).json({success: true, data: singleNotification})
})

//update notification
const updateNotification = asyncHaddler(async (req, res) => {
    const paramID = req.params.id 
    const updateNotification = await Notification.findOneAndUpdate({_id: paramID}, req.body, {runValidators: true, returnDocument: 'after'})
    if(!updateNotification){
        throw new NotFoundErrorHaddler('Notification not found!');
    }
    res.status(statusCodes.OK).json({success: true, data: updateNotification})
})

//delete notification
const deleteNotification = asyncHaddler(async (req, res) => {
    const paremID = req.params.id;
    const deleteNotification = await Notification.findOneAndDelete({_id: paremID})
    if(!deleteNotification || deleteNotification.length == 0){
        throw new NotFoundErrorHaddler('Notification not found!');
    }
    res.status(200).json({success: true, message: `${deleteNotification._id} is deleted!`})
})

module.exports = {
    getAllNotifications,
    addNotifications,
    getSingleNotification,
    updateNotification,
    deleteNotification
}