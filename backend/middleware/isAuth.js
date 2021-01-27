const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: 'TOKEN_MISSING' })
    }

    try {
        res.locals.verifiedUser = jwt.verify(token, process.env.SECRET);
        next();
    } catch (ex) {
        return res.status(400).json({ error: 'TOKEN_INVALID' })
    }
};
