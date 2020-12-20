const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true },
    price: {
        type: Number,
        required: true },
    description: {
        type: String,
        required: true },
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

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
