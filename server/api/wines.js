//routes by rhianna and mcrae
const router = require('express').Router()
const {Wine} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const wines = await Wine.findAll()
    res.json(wines)
  } catch (err) {
    next(err)
  }
})
