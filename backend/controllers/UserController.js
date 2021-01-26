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
    res.json(res.verifiedUser);
}

exports.updateProfile = async (req, res) => {
    try {
        if (res.user.id !== req.body.id) {
            res.status(400).json({ message: 'FAULTY_REQUEST' });
        }
        const updatedUser = await res.user.set(req.body);
        const result = await updatedUser.save();
        result.password = undefined;

        const token = newToken(result);

        res.status(200).json({
            success: true,
            token: token,
            user: {
                id: result._id,
                email: result.email,
                role: result.role,
                name: result.name,
                address: result.address
            }
        });
    } catch (err) {
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
            const token = newToken(user);

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
    if (!req.body.email || req.body.email.length <= 0) {
        res.status(400).json({ message: 'NO_EMAIL' });
        return;
    } else if (!req.body.password || req.body.password.length <= 0) {
        res.status(400).json({ message: 'NO_PASSWORD' });
        return;
    }
    // Middleware found an account with same email address
    if (res.user) {
        res.status(409).json({ message: 'EMAIL_IN_USE' });
        return;
    }
    const user = new User(req.body);

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;

            const token = newToken(user);

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
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Update user
exports.updateUser = async (req, res) => {
    if (res.user.role !== 'ROLE_ADMIN') {
        res.status(401).json({ message: 'UNAUTHORIZED' });
    }
    try {
        const query = {'_id': req.body.user.id}
        const user = await User.findOneAndUpdate(query, req.body.user).select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

// Delete user
exports.deleteUser = async (req, res) => {
    if (res.user.role !== 'ROLE_ADMIN') {
        res.status(401).json({ message: 'UNAUTHORIZED' });
    }
    try {
        const query = {'_id': req.params.id}
        await User.findOneAndDelete(query);
        console.log(query);
        res.status(200).json({ message: 'User has been deleted' });
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

newToken = (user) => {
    const userPayload = JSON.parse(JSON.stringify(user));
    userPayload.password = undefined;
    return jwt.sign({data: userPayload}, process.env.SECRET, {
        expiresIn: 86400 // 1 day
    });
}
