const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'ROLE_USER',
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        streetAndHouseNumber: {
            type: String
        },
        postalCode: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        }
    }
});

UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('User', UserSchema);
