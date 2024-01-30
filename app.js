const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();

const db = require('./config/db');
const auth = require('./auth/router');
const user = require('./user/router');

// Middlewares
app.use(express.static('files'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
db();

// Routes
app.use('/api/auth', auth);
app.use('/api/user', user);

const port = process.env.PORT || 5000; // will only run 5000

let server;

if (process.env.NODE_ENV !== 'test') {
    server = app.listen(port, () => console.log(`Server is running at ${port}`)); // to start the file
}

module.exports = app;