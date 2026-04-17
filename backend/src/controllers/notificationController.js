const Notification = require('../models/notificationModel');
const asyncHaddler = require('../utils/asyncHaddler');
const NotFoundErrorHaddler = require('../errors/NotFoundErrorHaddler');
const statusCodes = require('http-status-codes');

//get all Notifications
const getAllNotifications = asyncHaddler(async (req, res) => {
    res.status(statusCodes.OK).send("Get all nofitications")
})

//create nofidcations
const addNotifications = asyncHaddler(async (req, res) => {
    res.status(statusCodes.CREATED).send('Add notifications!')
})

//get single notification
const getSingleNotification = asyncHaddler(async (req, res) => {
   res.status(statusCodes.OK).send('Get single notification!')
})

//update notification
const updateNotification = asyncHaddler(async (req, res) => {
    res.status(statusCodes.OK).send('Update notification!')
})

//delete notification
const deleteNotification = asyncHaddler(async (req, res) => {
    res.status(statusCodes.OK).send('Delete notification!')
})

module.exports = {
    getAllNotifications,
    addNotifications,
    getSingleNotification,
    updateNotification,
    deleteNotification
}