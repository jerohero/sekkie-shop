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

exports.updateProfile = async (req, res) => {
    try {
        if (res.user.id !== req.body.id) {
            res.status(400).json({ message: 'FAULTY_REQUEST' });
        }
        const updatedUser = await res.user.set(req.body);
        const result = await updatedUser.save();
        result.password = undefined;
        res.status(200).json(result);
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err });
    }
}

exports.authenticateUser = async (req, res) => {
    const password = req.body.password;
    const user = res.user;

    if (!user) {
        return res.status(404).json({ success: false, message: 'NO_MATCH' });
    }

    bcrypt.compare(password, res.user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: err.message });
        if (isMatch) {
            const token = jwt.sign({data:user}, process.env.SECRET, {
                expiresIn: 604800 // 1 week
            });

            res.json({
               success: true,
               token: token,
               user: {
                   id: user._id,
                   email: user.email,
                   role: user.role,
                   name: user.name,
                   address: user.address
               }
            });
        } else {
            return res.status(401).json({ success: false, message: 'WRONG_CREDENTIALS' })
        }

    });
}

// Create one user
exports.createUser = async (req, res) => {
    console.log(req.body);
    if (!req.body.email || req.body.email.length <= 0) {
        res.status(400).json({ message: 'NO_EMAIL' });
        return;
    } else if (!req.body.password || req.body.password.length <= 0) {
        res.status(400).json({ message: 'NO_PASSWORD' });
        return;
    }
    // middleware found an account with same email address
    if (res.user) {
        res.status(409).json({ message: 'EMAIL_IN_USE' });
        return;
    }
    const user = new User(req.body);

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            // if (err) throw err;
            user.password = hash;

            const token = jwt.sign({data:user}, process.env.SECRET, {
                expiresIn: 604800 // 1 week
            });

            try {
                user.save();
                res.status(201).json({
                    success: true,
                    token: token,
                    user: user
                });
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    });
}

// Get users
exports.getUsers = async (req, res) => {
    if (res.user.role !== 'ROLE_ADMIN') {
        res.status(401).json({ message: 'UNAUTHORIZED' });
    }
    try {
        const users = await User.find().select('-password');
        console.log(users);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
