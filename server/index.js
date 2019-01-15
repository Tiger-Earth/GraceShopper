const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express()
const {Order, User} = require('./db/models')
const socketio = require('socket.io')
const stripe = require('stripe')('sk_test_u2tSxochrAbn2C9rH7JiIbXz')
module.exports = app

// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'random_secret',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
  app.use('/auth', require('./auth'))
  const {router} = require('./api')
  app.use('/api', router)

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))
  app.use(require('body-parser').text())

  app.post('/charge', async (req, res) => {
    try {
      const subTotals = req.body.wines.map(
        wine => wine.price * req.body.cart[wine.id]
      )
      const amount = subTotals.reduce((tot, x) => tot + x, 0)

      let {status} = await stripe.charges.create({
        amount,
        currency: 'usd',
        description: 'An example charge',
        source: req.body.tokenId
      })

      if (status === 'succeeded') {
        if (req.user) {
          const order = await req.user.getCart()
          order.status = 'closed'
          order.name = req.body.name
          order.shippingAddress = req.body.shippingAddress
          order.total = req.body.amount
          await order.save()
          //open up the customer's next cart
          const nextOrder = await Order.create()
          await req.user.addOrder(nextOrder)
        } else {
          const newOrder = await Order.create({status: 'closed'})
          const cartArray = Object.entries(req.body.cart)
          await Promise.all(
            cartArray.map(([key, val]) =>
              newOrder.addWine(key, {through: {quantity: val}})
            )
          )
          newOrder.name = req.body.name
          newOrder.shippingAddress = req.body.shippingAddress
          newOrder.total = req.body.amount
          await newOrder.save()
        }
      }
      res.json({status})
    } catch (err) {
      res.status(500).end()
    }
  })

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}
