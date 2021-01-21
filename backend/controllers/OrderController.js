// Create one item
const Order = require('../models/Order');


exports.createOrder = async (req, res) => {
    const reqOrder = req.body.order;
    const order = new Order({
        items: reqOrder.items,
        name: reqOrder.name,
        email: reqOrder.email,
        address: reqOrder.address,
        totalPrice: reqOrder.totalPrice,
        date: reqOrder.date,
        status: reqOrder.status,
        userId: reqOrder.userId
    });
    try {
        const newOrder = await order.save();
        res.status(201).json({ newOrder });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
