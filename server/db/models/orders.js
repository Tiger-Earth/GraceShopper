const Sequelize = require('sequelize')
const db = require('../db')
const Wine = require('./wine')

const Order = db.define('order', {
  name: {
    type: Sequelize.STRING
  },
  shippingAddress: {
    type: Sequelize.STRING
  },
  billingAddress: {
    type: Sequelize.STRING
  },
  total: {
    type: Sequelize.DECIMAL
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'open'
  }
})

module.exports = Order

/**
 * instanceMethods
 */
Order.prototype.getCompleteVersion = function() {
  return Order.findById(this.id, {
    include: [Wine]
  })
}

// making a change so I can make a new commit
