const express = require('express');
const { getAllOrders, createOrders, getSingleOrders, updateOrders, deleteOrders} = require('../controllers/ordersController');
const router = express.Router()

router.route('/').get(getAllOrders).post(createOrders);
router.route('/:id').get(getSingleOrders).patch(updateOrders).delete(deleteOrders);

module.exports = router