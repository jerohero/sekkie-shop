const express = require('express');

const itemController = require('../controllers/ItemController');
const findItem = require('../middleware/findItem');
const isAdmin = require('../middleware/isAdmin');
const addUser = require('../middleware/addUser');

const router = express.Router();

router.post('/', addUser, isAdmin, itemController.createItem);

router.get('/', itemController.getItems)

router.get('/:id', findItem, itemController.getItemById);

router.delete('/:id', addUser, isAdmin, findItem, itemController.deleteItemById);

router.put('/:id', addUser, isAdmin, itemController.updateItem)

module.exports = router;
