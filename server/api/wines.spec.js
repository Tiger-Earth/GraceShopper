/* global describe beforeEach it */
// test by rhianna and mcrae
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const agent = request.agent(app)
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

    describe('GET api/wines/:id', () => {
      it('returns the JSON of the wine based on the id', async () => {
        const res = await agent.get('/api/wines/12').expect(200)
        expect(res.body).to.be.an('object')
        expect(res.body.id).to.be.equal(id)
        expect(res.body.name).to.be.equal(name)
        expect(res.body.price).to.be.equal(price)
      })
    })
  }) // end describe('Wines routes')
})
