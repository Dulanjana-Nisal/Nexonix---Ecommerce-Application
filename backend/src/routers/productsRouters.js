const express = require('express');
const { getAllProducts, addProducts, getSingleProduct, updateProducts, deleteProducts } = require('../controllers/productsController');
const router = express.Router()

router.route('/products').get(getAllProducts).post(addProducts);
router.route('/products/:id').get(getSingleProduct).patch(updateProducts).delete(deleteProducts);

module.exports = router