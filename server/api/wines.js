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

router.get('/:id', async (req, res, next) => {
  try {
    const wine = await Wine.findById(req.params.id)
    res.json(wine)
  } catch (err) {
    next(err)
  }
})
