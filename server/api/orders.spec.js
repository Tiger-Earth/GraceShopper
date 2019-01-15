/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Order = db.model('order')
const Wine = db.model('wine')

describe('Orders routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    beforeEach(async () => {
      const user = await User.create({
        name: 'cody',
        email: 'cody@email.com'
      })
      const order = await Order.create({})
      await user.addOrder(order)
      const wine = await Wine.create({
        name: 'Cantina Furlani - Sur Lie Rosato NV',
        price: 30.0,
        imageURL:
          'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/cantina-furlani-sur-lie-rosato_1.jpg&w=155&h=184',
        color: 'Red'
      })
      await order.addWine(wine, {
        through: {
          quantity: 3
        }
      })
      app.request.user = user
    })

    it('GET /api/orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].status).to.be.equal('open')
      expect(res.body[0].wines).to.have.lengthOf(1)
      expect(res.body[0].wines[0]['order-item'].quantity).to.be.equal(3)
    })
  }) // end describe('/api/orders')
}) // end describe('Order routes')
