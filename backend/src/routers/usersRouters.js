const express = require('express');
const { userSignup, userSignin } = require('../controllers/usersController');
const router = express.Router()

router.route('/signup').post(userSignup);
router.route('/signin').post(userSignin);

module.exports = router