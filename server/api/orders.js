const router = require('express').Router()
const {Wine} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await req.user.getOrders({
      include: [Wine]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
