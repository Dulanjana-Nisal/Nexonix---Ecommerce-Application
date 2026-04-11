const express = require('express');
const { getAllProducts, addProducts, getSingleProduct, updateProducts, deleteProducts } = require('../controllers/productsController');
const router = express.Router()

router.route('/').get(getAllProducts).post(addProducts);
router.route('/:id').get(getSingleProduct).patch(updateProducts).delete(deleteProducts);

module.exports = router