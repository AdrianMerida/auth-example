module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/login')
  }
}

module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/')
  } else {
    next()
  }
}
