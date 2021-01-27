const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = async (req, res, next) => {
    let user;
    try {
        const query = {email: req.body.email};
        user = await User.findOne(query);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.locals.user = user;
    next();
}
