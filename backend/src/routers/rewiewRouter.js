const express = require('express');
const {getAllReviews,postReviews} = require('../controllers/rewiewController')
const authenticationMiddleware = require('../middlewares/authenticationMiddleware')
const router = express.Router();

router.route('/').get(getAllReviews).post(authenticationMiddleware, postReviews);

module.exports = router;