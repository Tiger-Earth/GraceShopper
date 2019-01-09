/* global describe beforeEach it */
// test by rhianna and mcrae
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Wine = db.model('wine')

describe('Wine routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/wines/', () => {
    const id = 12
    const name = 'Petrus 2001'
    const price = 50
    const color = 'red'

    beforeEach(() => {
      return Wine.create({
        id: id,
        name: name,
        price: price,
        color: color
      })
    })

    it('GET /api/wines', async () => {
      const res = await request(app)
        .get('/api/wines')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].id).to.be.equal(id)
      expect(res.body[0].name).to.be.equal(name)
      expect(res.body[0].price).to.be.equal(price)
      expect(res.body[0].color).to.be.equal(color)
    })
  }) // end describe('/api/wines')
}) // end describe('Wines routes')
