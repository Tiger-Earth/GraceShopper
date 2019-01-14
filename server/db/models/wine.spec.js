'use strict'
const {expect} = require('chai')
const db = require('../index')
const Wine = db.model('wine')

describe('The `Wine` model', () => {
  before(() => {
    return db.sync({force: true})
  })

  let wine
  beforeEach(async () => {
    wine = await Wine.create({
      name: 'Champagne',
      price: 25
    })
  })

  describe('attributes definition', () => {
    it('includes `name` and `price` fields', async () => {
      const savedWine = await wine.save()
      expect(savedWine.name).to.equal('Champagne')
      expect(savedWine.price).to.equal(25)
    })

    it('requires `name`', async () => {
      wine.name = null

      let result, error
      try {
        result = await wine.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when name is null')

      expect(error).to.be.an.instanceOf(Error)
    })
  })
})
