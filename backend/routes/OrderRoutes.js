const express = require('express');
const isAdmin = require('../middleware/isAdmin');
const addUser = require('../middleware/addUser');
const orderController = require('../controllers/OrderController');

const router = express.Router();

router.post('/', addUser.allowTokenMissing, orderController.createOrder);

router.get('/by-user', addUser, orderController.getOrdersByUserId);

router.get('/', addUser, isAdmin, orderController.getOrders);

router.delete('/:id', addUser, isAdmin, orderController.deleteOrder);

router.put('/', addUser, isAdmin, orderController.updateOrder);

module.exports = router;
