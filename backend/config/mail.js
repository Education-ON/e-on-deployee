// config/mail.js
require('dotenv').config();            
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,                     
  port: parseInt(process.env.SMTP_PORT, 10),       
  secure: false,                                   
  auth: {
    user: process.env.SMTP_USER,                   
    pass: process.env.SMTP_PASS,                  
  },
});

module.exports = transporter;
