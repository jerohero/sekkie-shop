const jwt = require("jsonwebtoken");
const auth = require("../auth");

module.exports = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: 'TOKEN_MISSING' })
    }

    try {
        res.locals.user = jwt.verify(token, process.env.SECRET);
    } catch (err) {
        const refreshToken = req.headers['refresh'];
        const newTokens = await auth.refreshTokens(token, refreshToken, process.env.SECRET, process.env.SECRET_2);
        if (newTokens.token && newTokens.refreshToken) {
            res.set('Access-Control-Expose-Headers', 'Authorization, Refresh');
            res.set('Authorization', newTokens.token);
            res.set('Refresh', newTokens.refreshToken);
        }
        res.locals.user = newTokens.user;
    }
    next();
}
