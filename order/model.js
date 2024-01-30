const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: "pending"
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema)