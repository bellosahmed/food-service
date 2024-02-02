const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    price: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        // required: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },

}, { timestamps: true })

module.exports = mongoose.model('Vendor', vendorSchema);