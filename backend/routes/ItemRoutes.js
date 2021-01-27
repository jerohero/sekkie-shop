const express = require('express');

const itemController = require('../controllers/ItemController');
const findItem = require('../middleware/findItem');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.post('/', isAdmin, itemController.createItem);

router.get('/', itemController.getItems)

router.get('/:id', findItem, itemController.getItemById);

router.delete('/:id', isAdmin, findItem, itemController.deleteItemById);

router.put('/:id', isAdmin, itemController.updateItem)

module.exports = router;
