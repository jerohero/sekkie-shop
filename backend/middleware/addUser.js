const jwt = require("jsonwebtoken");
const auth = require("../auth");
const User = require('../models/User')

module.exports = async (req, res, next) => {
    let token;
    token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'TOKEN_MISSING' })
    }

    try {
        const { user: { id } } = jwt.verify(token, process.env.SECRET);
        res.locals.user = await User.findById(id);
        res.cookie('token', token, { maxAge: 60 * 60 * 24 * 7 * 1000 , httpOnly: true})
        res.cookie('refresh-token', req.cookies.refreshToken, { maxAge: 60 * 60 * 24 * 7 * 1000 , httpOnly: true})
    } catch (err) {
        const refreshToken = req.cookies['refresh-token'];
        const newTokens = await auth.refreshTokens(token, refreshToken, process.env.SECRET, process.env.SECRET_2);
        if (newTokens.token && newTokens.refreshToken) {
            res.cookie('token', newTokens.token, { maxAge: 60 * 60 * 24 * 7 * 1000 , httpOnly: true})
            res.cookie('refresh-token', newTokens.refreshToken, { maxAge: 60 * 60 * 24 * 7 * 1000 , httpOnly: true})
        } else {
            return res.status(401).json({ message: 'REFRESH_TOKEN_EXPIRED' });
        }
        res.locals.user = newTokens.user;
    }
    next();
}
