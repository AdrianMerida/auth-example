const User = require('../models/user.model');
const mongoose = require('mongoose');
const mailer = require('../config/mailer.config');

module.exports.index = (_, res, next) => {
  User.find()
    .then(users => {
      res.render('users/index', { users })
    })
    .catch(error => console.log("Error: " + error))
}

module.exports.new = (_, res) => {
  res.render('users/new', { user: new User() })
}

module.exports.create = async (req, res, next) => {
  //const { body: { email = [] } = {} } = req
  const { name, email, password } = req.body
  const user = new User({ name, email, password })

  user.save()
    .then((user) => {
      mailer.sendValidateEmail(user)
      res.redirect('/login')
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('users/new', { user, error: error.errors })
      } else {
        console.log('Error en create => ' + error)
      }
    })
}

module.exports.validate = (req, res, next) => {
  const token = req.params.token
  User.findOneAndUpdate({ validateToken: token }, { $set: { validated: true } }, { new: true })
    .then(user => {
      res.redirect("/login")
    })
    .catch(error => {
      console.log("error en validación => ", error)
      res.redirect("/login")
    })
}

module.exports.login = (_, res) => {
  res.render('users/login')
}

module.exports.doLogin = (req, res, next) => {
  const { email, password } = req.body

  // Se verifica que ha introducido un usuario y una contraseña
  if (!email || !password) {
    res.redirect("/login")
  }

  User.findOne({ email: email, validated: true })
    .then(user => {
      if (user) {
        user.checkPassword(password)
          .then(() => {
            req.session.user = user // esto es la clave
            res.redirect('/')
          })
          .catch(error => console.log('Error al hacer login => ', error))
      }
    })
    .catch()
}

module.exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect('/')
}