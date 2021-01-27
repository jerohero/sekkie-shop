const express = require('express');
const isAdmin = require('../middleware/isAdmin');

const orderController = require('../controllers/OrderController');
const findUser = require('../middleware/findUser');

const router = express.Router();

router.post('/', orderController.createOrder);

router.get('/:id', orderController.getOrdersByUserId);

router.get('/', isAdmin, orderController.getOrders);

router.delete('/:id', isAdmin, orderController.deleteOrder);

router.put('/', isAdmin, orderController.updateOrder);


module.exports = router;
