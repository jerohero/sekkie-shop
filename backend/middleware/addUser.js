const jwt = require("jsonwebtoken");
const auth = require("../auth");
const User = require('../models/User')

module.exports = async (req, res, next) => {
    let token = req.headers.authorization.replace(/Bearer /g, '');

    if (!token) {
        return res.status(401).json({ message: 'TOKEN_MISSING' })
    }

    try {
        const { user: { id } } = jwt.verify(token, process.env.SECRET);
        res.locals.user = await User.findById(id);
    } catch (err) {
        const refreshToken = req.headers['refresh'];
        const newTokens = await auth.refreshTokens(token, refreshToken, process.env.SECRET, process.env.SECRET_2);
        if (newTokens.token && newTokens.refreshToken) {
            res.set('Access-Control-Expose-Headers', 'Authorization, Refresh');
            res.set('Authorization', newTokens.token);
            res.set('Refresh', newTokens.refreshToken);
        } else {
            return res.status(401).json({ message: 'REFRESH_TOKEN_EXPIRED' });
        }
        res.locals.user = newTokens.user;
    }
    next();
}
