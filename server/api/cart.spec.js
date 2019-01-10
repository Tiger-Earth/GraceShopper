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
      await Promise.all(
        wines.slice(0, 2).map((wine, idx) =>
          Wine.create(wine).then(newWine =>
            order.addWine(newWine, {
              through: {
                quantity: idx + 1
              }
            })
          )
        )
      )
      await Wine.create(wines[2])
      app.request.user = user
    })

    it('GET /api/cart', async () => {
      const res = await request(app)
        .get('/api/cart')
        .expect(200)

      expect(res.body.status).to.be.equal('open')
      expect(res.body.wines).to.have.lengthOf(2)
      expect(res.body.wines[0]['order-item'].quantity).to.be.equal(1)
    })

    it('POST /api/cart/:wineId', async () => {
      const res = await request(app)
        .post('/api/cart/3')
        .send({quantity: 4})
        .expect(201)

      expect(res.body.status).to.be.equal('open')
      expect(res.body.wines).to.have.lengthOf(3)
      expect(res.body.wines[2]['order-item'].quantity).to.be.equal(4)
    })

    xit('PUT /api/cart/:wineId', async () => {
      const res = await request(app)
        .put('/api/cart/2')
        .send({quantity: 10})
        .expect(202)

      expect(res.body.status).to.be.equal('open')
      expect(res.body.wines).to.have.lengthOf(2)
      expect(res.body.wines[1]['order-item'].quantity).to.be.equal(10)
    })

    it('DELETE /api/cart/:wineId', async () => {
      const res = await request(app)
        .delete('/api/cart/1')
        .expect(204)
    })
  }) // end describe('/api/cart')
}) // end describe('Cart routes')
