const User = require('./user')
const Wine = require('./wine')
const Order = require('./orders')
const db = require('../db')
const Sequelize = require('Sequelize')

//join table
const OrderItem = db.define('order-item', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

Wine.belongsToMany(Order, {through: OrderItem})
Order.belongsToMany(Wine, {through: OrderItem})

Order.belongsTo(User)
User.hasMany(Order)

module.exports = {
  User,
  Wine,
  Order
}
