const express = require('express');
const { getOrders, getAllOrders, createOrders, getSingleOrders, updateOrders, deleteOrders} = require('../controllers/ordersController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const router = express.Router()

router.route('/').get(authenticationMiddleware, getOrders).post(authenticationMiddleware,createOrders);
router.route('/all').get(authenticationMiddleware, getAllOrders);
router.route('/:id').get(getSingleOrders).patch(updateOrders).delete(authenticationMiddleware,deleteOrders);

module.exports = router