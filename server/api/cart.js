const router = require('express').Router()
const {Wine, Order} = require('../db/models')
const {isAuthenticated} = require('./index')
module.exports = router

// for all methods in this route, attach the appropriate cart to req.cart
router.all('/*', isAuthenticated, async (req, res, next) => {
  req.cart = await req.user.getCart()
  next()
})

// get all items in cart
router.get('/', async (req, res, next) => {
  try {
    const complete = req.query.complete
    if (!complete) {
      // if undefined or explicitly set to false
      // the bare version is just an object of the form { wineId: quantity }
      res.json(await req.cart.getBareVersion())
    } else {
      console.log('need to get here')
      // otherwise it includes the cart and eager loads the wines with their quantity
      res.json(await req.cart.getCompleteVersion())
    }
  } catch (err) {
    next(err)
  }
})

router.post('/:wineId', async (req, res, next) => {
  try {
    const hasWine = await req.cart.hasWine(req.params.wineId)
    if (hasWine) {
      const wineToUpdate = await req.cart.getWineById(req.params.wineId)
      wineToUpdate['order-item'].quantity += +req.body.quantity
      await wineToUpdate['order-item'].save()
    } else {
      console.log('addWine')
      await req.cart.addWine(req.params.wineId, {
        through: {
          quantity: req.body.quantity
        }
      })
    }
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.put('/:wineId', async (req, res, next) => {
  try {
    const wineToUpdate = await req.cart.getWineById(req.params.wineId)
    wineToUpdate['order-item'].quantity = req.body.quantity
    await wineToUpdate['order-item'].save()
    res.sendStatus(202)
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
