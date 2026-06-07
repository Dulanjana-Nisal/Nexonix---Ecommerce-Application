const express = require('express');
const {getAllReviews,postReviews,deleteReview} = require('../controllers/rewiewController')
const authenticationMiddleware = require('../middlewares/authenticationMiddleware')
const router = express.Router();

router.route('/').get(getAllReviews).post(authenticationMiddleware, postReviews);
router.route('/:id').delete(deleteReview);

module.exports = router;