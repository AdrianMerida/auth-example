const nodemailer = require('nodemailer');

const APP_HOST = process.env.APP_HOST || 'http://localhost:3000'

const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass }
});

module.exports.sendValidateEmail = (targetUser) => {
  console.log('TODO!') // enviar el correo
}
