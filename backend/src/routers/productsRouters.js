const express = require('express');
const { getAllProducts, addProducts, getSingleProduct,recommendProducts, updateProducts, deleteProducts } = require('../controllers/productsController');
const router = express.Router()

router.route('/').get(getAllProducts).post(addProducts);
router.route('/:id').get(getSingleProduct).patch(updateProducts).delete(deleteProducts);
router.route('/:id/recommendations').get(recommendProducts);

module.exports = router