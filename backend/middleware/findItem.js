const Item = require('../models/Item');

module.exports = async (req, res, next) => {
    let item;
    try {
        item = await Item.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Cannot find Item' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.locals.item = item;
    next();
}
