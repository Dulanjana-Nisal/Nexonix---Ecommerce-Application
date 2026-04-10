const express = require('express');
const { userSignup } = require('../controllers/usersController');
const router = express.Router()

router.route('/signup').get(userSignup);

module.exports = router