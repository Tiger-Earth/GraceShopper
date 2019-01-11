const router = require('express').Router()
module.exports = router

router.use('/wines', require('./wines'))
router.use('/orders', require('./orders'))
router.use('/cart', require('./cart'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
