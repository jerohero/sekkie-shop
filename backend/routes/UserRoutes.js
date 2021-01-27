const express = require('express');

const userController = require('../controllers/UserController');
const findUser = require('../middleware/findUser');
const isAuth = require('../middleware/isAuth');
const passport = require('passport');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

// Register
router.post('/register', findUser, userController.createUser);

// Authenticate
router.post('/authenticate', findUser, userController.authenticateUser);

// GET Profile
router.get('/profile', isAuth, userController.getProfile);

// UPDATE Profile (done by users)
router.put('/profile', isAuth, findUser, userController.updateProfile);

// GET Users
router.get('/', isAdmin, userController.getUsers);

// UPDATE User (done by admins)
router.put('/', isAdmin, userController.updateUser);

router.delete('/:id', isAdmin, userController.deleteUser);


module.exports = router;
