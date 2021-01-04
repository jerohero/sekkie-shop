const express = require('express');

const userController = require('../controllers/UserController');
const findUser = require('../middleware/findUser');

const router = express.Router();

router.post('/register', findUser.byEmail, userController.createUser);

module.exports = router;
