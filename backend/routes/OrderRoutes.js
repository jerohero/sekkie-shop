const express = require('express');

const orderController = require('../controllers/OrderController');

const router = express.Router();

router.post('/', orderController.createOrder);

router.get('/:id', orderController.getOrdersByUserId);

module.exports = router;
