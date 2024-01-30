// import packages
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    phonenum: {
        type: Number,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'vendor'], // user has basic access while admin have more
        default: 'user'
    },
    gender: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false // when user is registered will show false untill he verifies his account
    }
}, { timestamps: true }); // to create a model of user


module.exports = mongoose.model('User', userSchema); // to export file