const router = require('express').Router()
module.exports = {router, isAuthenticated}

router.use('/users', require('./users'))
router.use('/wines', require('./wines'))
router.use('/orders', require('./orders'))
router.use('/cart', require('./cart'))

function isAuthenticated(req, res, next) {
  if (req.user && req.session.user.id) {
    return next()
  } else {
    res.redirect('/')
  }
}

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
