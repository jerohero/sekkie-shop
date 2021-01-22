const express = require('express');

const orderController = require('../controllers/OrderController');
const findUser = require('../middleware/findUser');

const router = express.Router();

router.post('/', orderController.createOrder);

router.get('/:id', orderController.getOrdersByUserId);

router.get('/', findUser.byHeaderId, orderController.getOrders);

router.put('/', findUser.byHeaderId, orderController.updateOrder);

module.exports = router;
