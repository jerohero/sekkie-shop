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
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

exports.getOrdersByUserId = async (req, res) => {
    let orders;
    try {
        orders = await Order.find({ userId: req.params.id });
        if (orders == null) {
            return res.status(404).json({ message: 'Cannot find Order' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.json(orders);
}
