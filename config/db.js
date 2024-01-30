const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const db = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL, {});
        console.log(`Mongo is connected: ${con.connection.host}`);
        return con; // Make sure to return the connection object
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = db;
