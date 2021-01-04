const User = require('../models/User');

exports.byEmail = async (req, res, next) => {
    let user;
    try {
        const query = {email: req.body.email};
        user = await User.findOne(query);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}
