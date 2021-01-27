// const mongoose = require('mongoose');
// const User = mongoose.model('User');
//
// module.exports = async (req, res, next) => {
//     let user;
//     try {
//         user = await User.findById(req.headers.user);
//         if (user.role !== 'ROLE_ADMIN') {
//             return res.status(403).json({ message: 'User is not permitted to perform this action.' })
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
//     res.locals.admin = user;
//     next();
// }
