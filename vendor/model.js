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
    productname: {
        type: String,
        required: true
    },
    shopname: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
}, { timestamps: true })

module.exports = mongoose.model('Vendor', vendorSchema);