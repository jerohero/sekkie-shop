const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true },
    price: {
        type: Number,
        required: true },
    description: {
        type: String,
        required: false },
    primaryImagePath: {
        type: String,
        required: true },
    secondaryImagePaths: {
        type: [String],
        required: false },
    sizes: {
        type: [String],
        required: true },
    colors: {
        type: [String],
        required: false },
}, { timestamps: true });

ItemSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ItemSchema.set('toJSON', {
    virtuals: true
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
