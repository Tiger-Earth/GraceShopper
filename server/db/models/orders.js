const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  },
  total: {
    type: Sequelize.DECIMAL
  }
})

module.exports = Order

// making a change so I can make a new commit
