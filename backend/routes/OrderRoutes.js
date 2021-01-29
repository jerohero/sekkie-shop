const express = require('express');
const isAdmin = require('../middleware/isAdmin');
const addUser = require('../middleware/addUser');
const orderController = require('../controllers/OrderController');

const router = express.Router();

router.post('/', orderController.createOrder);

router.get('/:id', orderController.getOrdersByUserId);

router.get('/', addUser, isAdmin, orderController.getOrders);

router.delete('/:id', addUser, isAdmin, orderController.deleteOrder);

router.put('/', addUser, isAdmin, orderController.updateOrder);

module.exports = router;
