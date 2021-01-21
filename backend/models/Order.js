const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    items: {
        type: [{
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            },
            selectedSize: {
                type: String,
                required: true
            },
            selectedColor: {
                type: String,
                required: true
            },
            selectedAmount: {
                type: Number,
                required: true
            }
        }],
        required: true
    },
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
    },
    email: {
        type: String,
        required: true
    },
    address: {
        streetAndHouseNumber: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    totalPrice: {
      type: Number,
      required: true
    },
    date: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    userId: {
        type: String
    }
}, { timestamps: true });

OrderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

OrderSchema.set('toJSON', {
    virtuals: true
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
