const express = require('express');
const getAllReviews = require('../controllers/rewiewController')
const router = express.Router();

router.route('/').get(getAllReviews);

module.exports = router;