const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    price: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('Vendor', vendorSchema);