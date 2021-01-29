const Item = require('../models/Item');
const User = require('../models/User')

// Get all items
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get one item
exports.getItemById = (req, res) => {
    res.status(200).json(res.locals.item);
}

// Create one item
exports.createItem = async (req, res) => {
    const reqItem = req.body.item;
    const item = new Item({
        name: reqItem.name,
        price: reqItem.price,
        category: reqItem.category,
        clothingCollection: reqItem.clothingCollection,
        primaryImagePath: reqItem.primaryImagePath,
        secondaryImagePaths: reqItem.secondaryImagePaths,
        sizes: reqItem.sizes,
        colors: reqItem.colors
    });
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Delete one item
exports.deleteItemById = async (req, res) => {
    try {
        await res.locals.item.deleteOne();
        res.json({ message: 'Item has been deleted.' });
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

exports.updateItem = async (req, res) => {
    try {
        const query = {'_id': req.params.id}
        const item = await Item.findOneAndUpdate(query, req.body.item);
        res.status(200).json(item);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}
