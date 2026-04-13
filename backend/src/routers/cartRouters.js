const express = require('express');
const { getAllCartItems, createCartItems, getSingleCartItem, updateCartItems, deleteCartItems} = require('../controllers/cartController');
const router = express.Router()

router.route('/').get(getAllCartItems).post(createCartItems);
router.route('/:id').get(getSingleCartItem).patch(updateCartItems).delete(deleteCartItems);

module.exports = router