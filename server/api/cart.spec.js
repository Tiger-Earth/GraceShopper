/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Order = db.model('order')
const Wine = db.model('wine')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart/', () => {
    let wines = [
      {
        name: 'Alessandro Viola - Sinfonia Di Grillo 2016',
        price: 38.0,
        imageURL:
          'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/alessandro-viola-sinfonia-di-grillo_1.jpg&w=155&h=184',
        color: 'white'
      },
      {
        name: 'Cantina Furlani - Sur Lie Rosato NV',
        price: 30.0,
        imageURL:
          'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/cantina-furlani-sur-lie-rosato_1.jpg&w=155&h=184',
        color: 'red'
      },
      {
        name: 'Cantina Giardino - Vino Bianco 2017 (1.5L)',
        price: 42.0,
        imageURL:
          'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/cantina-giardino-vino-bianco_1.jpg&w=220&h=250',
        color: 'white'
      }
    ]
    beforeEach(async () => {
      const user = await User.create({
        name: 'cody',
        email: 'cody@email.com'
      })
      const order = await Order.create({})
      await user.addOrder(order)
      await Wine.create(wines[0]).then(newWine =>
        order.addWine(newWine, {
          through: {
            quantity: 1
          }
        })
      )
      await Wine.create(wines[1]).then(newWine =>
        order.addWine(newWine, {
          through: {
            quantity: 2
          }
        })
      )
      await Wine.create(wines[2])
      app.request.user = user
    })

    it('GET /api/cart', async () => {
      const res = await request(app)
        .get('/api/cart')
        .expect(200)

      expect(res.body).to.deep.equal({
        1: 1,
        2: 2
      })
    })

    it('GET /api/cart/?complete=true', async () => {
      const res = await request(app)
        .get('/api/cart/?complete=true')
        .expect(200)

      expect(res.body.id).to.equal(1)
      expect(res.body.wines[1].name).to.equal(
        'Cantina Furlani - Sur Lie Rosato NV'
      )
      expect(res.body.wines[1]['order-item'].quantity).to.equal(2)
    })

    it('POST /api/cart/:wineId', async () => {
      const res = await request(app)
        .post('/api/cart/3')
        .send({quantity: 4})
        .expect(201)
      const newCart = await app.request.user.getCart()
      expect(newCart.wines).to.have.lengthOf(3)
      expect(newCart.wines[2]['order-item'].quantity).to.be.equal(4)
    })

    it('PUT /api/cart/:wineId', async () => {
      const res = await request(app)
        .put('/api/cart/1')
        .send({quantity: 10})
        .expect(202)
      const newCart = await app.request.user.getCart()
      expect(newCart.status).to.be.equal('open')
      expect(newCart.wines).to.have.lengthOf(2)
      expect(newCart.wines[0]['order-item'].quantity).to.be.equal(10)
    })

    it('DELETE /api/cart/:wineId', async () => {
      const res = await request(app)
        .delete('/api/cart/1')
        .expect(204)
      const newCart = await app.request.user.getCart()
      expect(newCart.status).to.be.equal('open')
      expect(newCart.wines).to.have.lengthOf(1)
    })
  }) // end describe('/api/cart')
}) // end describe('Cart routes')
