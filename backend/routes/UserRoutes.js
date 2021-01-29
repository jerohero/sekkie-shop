const express = require('express');

const userController = require('../controllers/UserController');
const findUser = require('../middleware/findUser');
const isAdmin = require('../middleware/isAdmin');
const addUser = require('../middleware/addUser');

const router = express.Router();

// Register
router.post('/register', findUser.byEmail, userController.createUser);

// Authenticate
router.post('/authenticate', findUser.byEmail, userController.authenticateUser);

// GET Profile
router.get('/profile', addUser, userController.getProfile);

// UPDATE Profile (done by users)
router.put('/profile', addUser, findUser.byId, userController.updateProfile);

// Log out user
router.delete('/logout', userController.logout);

// GET Users
router.get('/', isAdmin, userController.getUsers);

// UPDATE User (done by admins)
router.put('/', isAdmin, userController.updateUser);

// DELETE User
router.delete('/:id', isAdmin, userController.deleteUser);


module.exports = router;
