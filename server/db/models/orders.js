const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  },
  total: {
    type: Sequelize.DECIMAL
  },
  items: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
})

module.exports = Order
