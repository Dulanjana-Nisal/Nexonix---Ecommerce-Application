const express = require('express');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware')
const { getAllNotifications, addNotifications, getSingleNotification, updateNotification, deleteNotification} = require('../controllers/notificationController');
const router = express.Router()

router.route('/').get(authenticationMiddleware, getAllNotifications).post(addNotifications);
router.route('/:id').get(getSingleNotification).patch(updateNotification).delete(deleteNotification);

module.exports = router