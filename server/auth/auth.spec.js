/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('Auth routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/auth/login/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        password: 'foo'
      })
    })

    it('allows a user on the db to login', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({email: codysEmail, password: 'foo'})
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(codysEmail)
    })
  })

  describe('/auth/signup/', () => {
    it('allows a user to sign up and assigns a new cart', async () => {
      const res = await request(app)
        .post('/auth/signup')
        .send({email: 'fluffluff@email.com', password: 'oogabooga'})
        .expect(200)

      expect(res.body).to.be.an('object')
    })
  })
}) // end describe('Auth routes')
