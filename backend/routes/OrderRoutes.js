const express = require('express');

const orderController = require('../controllers/OrderController');

const router = express.Router();

router.post('/', orderController.createOrder);

module.exports = router;
