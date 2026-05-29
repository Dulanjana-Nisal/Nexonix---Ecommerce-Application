const express = require('express');
const { getAllOrders, createOrders, getSingleOrders, updateOrders, deleteOrders} = require('../controllers/ordersController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const router = express.Router()

router.route('/').get(authenticationMiddleware, getAllOrders).post(authenticationMiddleware,createOrders);
router.route('/:id').get(getSingleOrders).patch(updateOrders).delete(authenticationMiddleware,deleteOrders);

module.exports = router