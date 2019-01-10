const router = require('express').Router()
const {Wine} = require('../db/models')
module.exports = router

const getCart = async req => {
  const [order] = await req.user.getOrders({
    where: {status: 'open'},
    include: [Wine]
  })
  return order
}

// for all methods
router.all('/*', async (req, res, next) => {
  req.cart = await getCart(req)
  next()
})

// get all items in cart
router.get('/', async (req, res, next) => {
  try {
    res.json(req.cart)
  } catch (err) {
    next(err)
  }
})
