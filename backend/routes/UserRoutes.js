const express = require('express');

const userController = require('../controllers/UserController');
const findUser = require('../middleware/findUser');
const passport = require('passport');

const router = express.Router();

// Register
router.post('/register', findUser.byEmail, userController.createUser);

// Authenticate
router.post('/authenticate', findUser.byEmail, userController.authenticateUser);

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), userController.getProfile );

module.exports = router;
