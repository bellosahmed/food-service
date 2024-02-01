const express = require('express');
const { register, login, logout, verify, forgotpassword, resetpassword } = require('./controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify', verify);
router.post('/forgotpassword', forgotpassword);
router.post('/resetpassword', resetpassword);

module.exports = router;