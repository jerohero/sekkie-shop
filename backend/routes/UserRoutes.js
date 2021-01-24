const express = require('express');

const userController = require('../controllers/UserController');
const findUser = require('../middleware/findUser');
const isAuth = require('../middleware/isAuth');
const passport = require('passport');

const router = express.Router();

// Register
router.post('/register', findUser.byEmail, userController.createUser);

// Authenticate
router.post('/authenticate', findUser.byEmail, userController.authenticateUser);

// GET Profile
router.get('/profile', isAuth, userController.getProfile);

// UPDATE Profile (done by users)
router.put('/profile', isAuth, findUser.byEmail, userController.updateProfile);

// GET Users
router.get('/', findUser.byHeaderId, userController.getUsers);

// UPDATE User (done by admins)
router.put('/', findUser.byHeaderId, userController.updateUser);

router.delete('/:id', findUser.byHeaderId, userController.deleteUser);


module.exports = router;
