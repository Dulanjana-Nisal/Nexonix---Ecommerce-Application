const express = require('express');
const { userSignup, userSignin } = require('../controllers/usersController');
const router = express.Router()

router.route('/signup').get(userSignup);
router.route('/signin').get(userSignin);

module.exports = router