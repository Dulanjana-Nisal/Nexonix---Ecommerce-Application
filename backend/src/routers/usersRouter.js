const express = require('express')
const {getAllUsers,deleteUsers,updateUsers} = require('../controllers/userController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

const router = express.Router();

router.route('/').get(getAllUsers)
router.route('/:id').patch(authenticationMiddleware, updateUsers).delete(authenticationMiddleware, deleteUsers)

module.exports = router