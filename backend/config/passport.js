const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// const User = require('../models/user');
const mongoose = require('mongoose');
const User = mongoose.model('User');
require('dotenv').config()

module.exports = async function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.SECRET;
    await passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        });
    }));
}
