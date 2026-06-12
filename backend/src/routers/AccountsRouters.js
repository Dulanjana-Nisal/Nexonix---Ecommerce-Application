const express = require('express');
const { userSignup, userSignin, deleteUsers } = require('../controllers/accountsController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const router = express.Router()

router.route('/signup').post(userSignup);
router.route('/signin').post(userSignin);
router.route('/:id').delete(authenticationMiddleware, deleteUsers);

module.exports = router