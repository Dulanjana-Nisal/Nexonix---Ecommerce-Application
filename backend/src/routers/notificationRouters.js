const express = require('express');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware')
const { getNotifications, getAllNotifications, addNotifications, getSingleNotification, updateNotification, deleteNotification} = require('../controllers/notificationController');
const router = express.Router()

router.route('/').get(authenticationMiddleware, getNotifications).post(addNotifications);
router.route('/all').get(authenticationMiddleware, getAllNotifications);
router.route('/:id').get(getSingleNotification).patch(updateNotification).delete(deleteNotification);

module.exports = router