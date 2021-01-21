const express = require('express');

const orderController = require('../controllers/OrderController');
// const findItem = require('../middleware/findItem');

const router = express.Router();

// router.post('/', orderController.createItem);
//
// router.get('/', orderController.getItems)
//
// router.get('/:id', findItem, orderController.getItemById);
//
// router.delete('/:id', findItem, orderController.deleteItemById);
//
// router.put('/:id', findItem, orderController.updateItemById)

module.exports = router;
