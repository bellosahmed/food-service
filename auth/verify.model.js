const mongoose = require('mongoose');

const verifySchema = new mongoose.Schema({
    owner: {  // ref to the user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    token: { // token serves as the pin 
        type: String,
    },
    createdAt: { // when pin is create and expires after 1 hour
        type: Date,
        expires: 3600,
        default: Date.now()
    }
}, { timestamps: true }); // timestamps create when the file is created


module.exports = mongoose.model('Verify', verifySchema);