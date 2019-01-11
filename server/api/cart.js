const router = require('express').Router()
const {Wine} = require('../db/models')
const {isAuthenticated} = require('./index')
module.exports = router

const getCart = async req => {
  const [order] = await req.user.getOrders({
    where: {status: 'open'},
    include: [Wine]
  })
  return order
}

// for all methods
router.all('/*', isAuthenticated, async (req, res, next) => {
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

router.post('/:wineId', async (req, res, next) => {
  try {
    await req.cart.addWine(req.params.wineId, {
      through: {
        quantity: req.body.quantity
      }
    })
    const newCart = await getCart(req)
    res.status(201).json(newCart)
  } catch (err) {
    next(err)
  }
})

router.put('/:wineId', async (req, res, next) => {
  try {
    await req.cart
      .getWines({
        where: {id: req.params.wineId}
      })
      .then(([wine]) =>
        wine['order-item'].updateAttributes({
          quantity: req.body.quantity
        })
      )
    const newCart = await getCart(req)
    res.status(202).json(newCart)
  } catch (err) {
    next(err)
  }
})

router.delete('/:wineId', async (req, res, next) => {
  try {
    await req.cart.removeWine(req.params.wineId)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
