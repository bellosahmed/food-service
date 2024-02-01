const mongoose = require('mongoose');

const resetSchema = new mongoose.Schema({
    owner: { // ref to the user 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    token: {
        type: String,
    },
    createdAt: { // when pin is create and expires after 1 hour
        type: Date,
        expires: 3600,
        default: Date.now()
    }
}, { timestamps: true }); // timestamps create when the file is created


module.exports = mongoose.model('Resttoken', resetSchema);