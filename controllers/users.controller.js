const User = require('../models/user.model');
const mongoose = require('mongoose');
const mailer = require('../config/mailer.config');

module.exports.index = (_, res, next) => {
  User.find()
    .then(users => {
      res.render('users/index', { users })
    })
    .catch(next)
}

module.exports.new = (_, res) => {
  res.render('users/new', { user: new User() })
}

module.exports.create = (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  user.save()
    .then((user) => {
      mailer.sendValidateEmail(user)
      res.redirect('/login')
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('users/new', { user, error: error.errors })
      } else {
        next(error);
      }
    })
}

module.exports.validate = (req, res, next) => {
  res.send('TODO!')
}

module.exports.login = (_, res) => {
  res.render('users/login')
}

module.exports.doLogin = (req, res, next) => {
  const {email, password} = req.body

  // Se verifica que ha introducido un usuario y una contraseña
  if(!email || !password) {
    console.log('gggemi')
    return res.render('users/login', {user: req.body})
  }

  


}

module.exports.logout = (req, res) => {
  res.send('TODO!')
}