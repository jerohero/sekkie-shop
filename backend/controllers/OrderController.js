// Create one item
const User = require('../models/User')
const Order = require('../models/Order');


exports.createOrder = async (req, res) => {
    let userId;
    if (res.locals.user) {
        userId = res.locals.user._id;
    }

    const reqOrder = req.body.order;
    const order = new Order({
        items: reqOrder.items,
        name: reqOrder.name,
        email: reqOrder.email,
        address: reqOrder.address,
        totalPrice: reqOrder.totalPrice,
        date: reqOrder.date,
        status: reqOrder.status,
        userId: userId
    });
    try {
        const newOrder = await order.save();
        res.status(201).json({ date: newOrder.date });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const query = {'_id': req.body.order.id}
        const order = await Order.findOneAndUpdate(query, req.body.order);
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const query = {'_id': req.params.id}
        await Order.findOneAndDelete(query);
        res.status(200).json({ message: 'Item has been deleted' });
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

exports.getOrdersByUserId = async (req, res) => {
    let orders;
    try {
        orders = await Order.find({ userId: res.locals.user._id });
        if (orders == null) {
            return res.status(404).json({ message: 'Cannot find Order' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.json(orders);
}
