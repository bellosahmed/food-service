const User = require('../user/model');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // must have any credentials to login 
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ msg: 'Unauthorized! You need to loggin', status: false });
        }

        const decoded = await jwt.verify(token, process.env.jwt_secret) // verify the token

        const user = await User.findById(decoded.id);   // find the user

        if (!user) {
            return res.status(401).json({ msg: 'Cannot find user', status: false });
        }

        req.user = user;
        next();
    } catch (e) {
        console.error(e);
        res.status(400).send({ msg: 'token is not valid', error: e.message });
    }

};

const restrict = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You dont have access to this file', status: false });
        }
        next();
    }
};

module.exports = { auth, restrict };