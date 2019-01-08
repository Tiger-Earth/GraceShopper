const Sequelize = require('sequelize')
const db = require('../db')

const Wine = db.define('wine', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL
  },
  color: {
    type: Sequelize.ENUM('red', 'white')
  },
  imageURL: {
    type: Sequelize.STRING
  }
})

module.exports = Wine
