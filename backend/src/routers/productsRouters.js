const express = require('express');
const { getAllProducts, addProducts, getSingleProduct,recommendProducts, updateProducts, deleteProducts } = require('../controllers/productsController');
const verifyAdminMiddleware = require('../middlewares/verifyAdminMiddleware');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const router = express.Router()

router.route('/').get(getAllProducts).post(addProducts);
router.route('/:id').get(getSingleProduct).patch(updateProducts).delete(authenticationMiddleware, verifyAdminMiddleware, deleteProducts);
router.route('/:id/recommendations').get(recommendProducts);

module.exports = router