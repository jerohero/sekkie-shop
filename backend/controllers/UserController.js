const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Get one user by Id
exports.getUserById = async (req, res) => {
    try {
        let user;
        user = await User.findById(req.body.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find User' });
        }
        res.json(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Get one user by Email
exports.getUserByEmail = async (req, res) => {
    try {
        let user;
        const query = {email: req.body.email};
        user = await User.findOne(query);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        res.json(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

exports.getProfile = async (req, res) => {
    res.json({user: req.user});
}

exports.authenticateUser = async (req, res) => {
    const password = req.body.password;
    const user = res.user;

    if (!user) {
        return res.status(404).json({ message: 'Cannot find user' });
    }

    bcrypt.compare(password, res.user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: err.message });
        if (isMatch) {
            const token = jwt.sign({data:user}, process.env.SECRET, {
                expiresIn: 604800 // 1 week
            });

            res.json({
               success: true,
               token: 'JWT ' + token,
               user: {
                   id: user._id,
                   name: user.name,
                   email: user.email
               }
            });
        } else {
            return res.status(401).json({ success: false, message: 'Wrong password' })
        }

    });
}

// Create one user
exports.createUser = async (req, res) => {
    if (!req.body.email || req.body.email.length <= 0) {
        res.status(400).json({ message: 'An email is required.' });
        return;
    } else if (!req.body.password || req.body.password.length <= 0) {
        res.status(400).json({ message: 'A password is required.' });
        return;
    }
    // middleware found an account with same email address
    if (res.user) {
        res.status(409).json({ message: 'This email address is already in use. Please try another email address.' });
        return;
    }

    const user = new User(req.body);

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            // if (err) throw err;
            user.password = hash;

            try {
                user.save();
                res.status(201).json({ newUser: user });
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    });
}
