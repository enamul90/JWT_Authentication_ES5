const nodemailer = require('nodemailer');
const {EMAIL_HOST, EMAIL_PASS,  EMAIL_PORT, EMAIL_SECURITY, EMAIL_USER} = require('../config/Config');


const EmailSend = async (emailTo, emailText, emailSubject)=>{

    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: EMAIL_SECURITY,
        auth:{
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    const info={
        from: "E Commerce App <info@teamrabbil.com>",
        to:emailTo,
        subject:emailSubject,
        text:emailText,
    }

    return await transporter.sendMail(info);

}


module.exports = EmailSend;