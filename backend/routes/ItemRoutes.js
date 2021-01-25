const express = require('express');

const itemController = require('../controllers/ItemController');
const findItem = require('../middleware/findItem');
const findUser = require('../middleware/findUser');

const router = express.Router();

router.post('/', itemController.createItem);

router.get('/', itemController.getItems)

router.get('/:id', findItem, itemController.getItemById);

router.delete('/:id', findItem, itemController.deleteItemById);

router.put('/:id', findUser.byHeaderId, itemController.updateItem)

module.exports = router;
