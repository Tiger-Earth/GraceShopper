const Sequelize = require('sequelize')
const db = require('../db')

const Wine = db.define('wine', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER
  },
  color: {
    type: Sequelize.ENUM('Red', 'White', 'Rose')
  },
  imageURL: {
    type: Sequelize.STRING
  }
})

module.exports = Wine
