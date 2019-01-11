const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//temporary
function isAdmin(req, res, next) {
  //only Cody may access :)
  if (req.user.id === 1) {
    return next()
  } else {
    res.redirect('/')
  }
}

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
