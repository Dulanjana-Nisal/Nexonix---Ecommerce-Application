const express = require('express');
const { userSignup, userSignin, deleteUsers } = require('../controllers/usersController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const router = express.Router()

router.route('/signup').post(userSignup);
router.route('/signin').post(authenticationMiddleware, userSignin);
router.route('/:id').delete(deleteUsers);

module.exports = router