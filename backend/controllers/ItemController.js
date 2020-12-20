const Item = require('../models/ItemModel');

// Get all items
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    // Item.find().sort( {createdAt: -1 })
    //     .then((result) => {
    //         for (let i = 0; i < result.length; i++) {
    //             result[i]._id = result[i]._id.toHexString();
}

// Get one item
exports.getItemById = (req, res) => {
    res.json(res.item);
}

// Create one item
exports.createItem = async (req, res) => {
    console.log(req);
    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        primaryImagePath: req.body.primaryImagePath,
        secondaryImagePaths: req.body.secondaryImagePaths,
        sizes: req.body.sizes,
        colors: req.body.colors
    });
    try {
        const newItem = await item.save();
        res.status(201).json({ newItem });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Delete one item
exports.deleteItemById = async (req, res) => {
    try {
        await res.item.deleteOne();
        res.json({ message: 'Item has been deleted' });
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

exports.updateItemById = async (req, res) => {
    try {
        const updatedItem = await res.item.set(req.body);
        const result = await updatedItem.save();
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}
