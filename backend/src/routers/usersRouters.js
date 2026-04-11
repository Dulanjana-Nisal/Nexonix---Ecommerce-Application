const express = require('express');
const { userSignup, userSignin } = require('../controllers/usersController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const router = express.Router()

router.route('/signup').post(userSignup);
router.route('/signin').post(authenticationMiddleware, userSignin);

module.exports = router