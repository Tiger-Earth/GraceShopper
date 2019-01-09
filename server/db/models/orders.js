const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  total: {
    type: Sequelize.DECIMAL
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'open'
  }
})

module.exports = Order

// making a change so I can make a new commit
