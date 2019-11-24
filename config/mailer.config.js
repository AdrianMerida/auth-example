const nodemailer = require('nodemailer');

const APP_HOST = process.env.APP_HOST || 'http://localhost:3000'

const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass }
});

const configuration = (targetUser) =>  ({
  from: `"My Awesome Project 👻" <${user}>`,
  to: targetUser.email,
  subject: 'Verificación primera app IH!',
  text: 'Si hay algún problema, devuelve esto, cuando no soporta html',
  html: `<a href="${APP_HOST}/users/${targetUser.validateToken}/validate">Validate account</a>`
})

module.exports.sendValidateEmail = (targetUser) => {
  transporter.sendMail(configuration(targetUser))
}