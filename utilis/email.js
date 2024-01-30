const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const createTransporter = () => { //to create the details of the transporter
    return nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', // Outlook SMTP server
        port: 587, // Port for secure TLS connection
        secure: false,
        auth: {
            user: process.env.authemail,
            pass: process.env.authpass,
        },
    });
};

const createMailOptions = (to, subject, text) => { // the options avaible to send the mail
    return {
        from: process.env.authemail,
        to,
        subject,
        text,
    };
};

module.exports = { createTransporter, createMailOptions };