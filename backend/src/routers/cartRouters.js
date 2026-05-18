const authenticationMiddleware = require('../middlewares/authenticationMiddleware')
const express = require('express');
const { getAllCartItems, createCartItems, getSingleCartItem, updateCartItems, deleteCartItems} = require('../controllers/cartController');
const router = express.Router()

router.route('/').get(authenticationMiddleware, getAllCartItems).post(authenticationMiddleware, createCartItems);
router.route('/:id').get(getSingleCartItem).patch(updateCartItems).delete(authenticationMiddleware, deleteCartItems);

module.exports = router