const express = require('express');
const { getAllNotifications, addNotifications, getSingleNotification, updateNotification, deleteNotification} = require('../controllers/notificationController');
const router = express.Router()

router.route('/').get(getAllNotifications).post(addNotifications);
router.route('/:id').get(getSingleNotification).patch(updateNotification).delete(deleteNotification);

module.exports = router