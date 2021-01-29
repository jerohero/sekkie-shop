const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    if (res.locals.user.role  !== 'ROLE_ADMIN') {
        return res.status(403).json({ message: 'User is not permitted to perform this action.' })
    }
    next();
}
