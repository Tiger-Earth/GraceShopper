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

const getBareCart = userCart => {
  const cart = {}
  userCart.wines.forEach(wine => {
    cart[wine.id] = wine['order-item'].quantity
  })
  return cart
}

const getSpecificWine = req => {
  return req.cart
    .getWines({
      where: {id: req.params.wineId}
    })
    .then(([wine]) => {
      return wine
    })
}

// for all methods
router.all('/*', async (req, res, next) => {
  req.cart = await getCart(req)
  next()
})

// get all items in cart
router.get('/', (req, res, next) => {
  try {
    res.json(getBareCart(req.cart))
  } catch (err) {
    next(err)
  }
})

router.post('/:wineId', async (req, res, next) => {
  try {
    const hasWine = await req.cart.hasWine(req.params.id)
    if (hasWine) {
      const wineToUpdate = await getSpecificWine(req)
      wineToUpdate['order-item'].quantity = wineToUpdate.quantity + 1
      await wineToUpdate['order-item'].save()
    } else {
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
    const wineToUpdate = await getSpecificWine(req)
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
