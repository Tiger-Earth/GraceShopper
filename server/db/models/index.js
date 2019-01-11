const User = require('./user')
const Wine = require('./wine')
const Order = require('./orders')
const db = require('../db')
const Sequelize = require('sequelize')

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

User.prototype.getCart = async function() {
  const [order] = await this.getOrders({
    where: {status: 'open'},
    include: [Wine]
  })
  return order
}

Order.prototype.getWineById = async function(id) {
  const [wine] = await this.getWines({
    where: {id}
  })
  return wine
}

Order.prototype.getBareVersion = async function() {
  const wines = await this.getWines()
  const cart = {}
  wines.forEach(wine => {
    cart[wine.id] = wine['order-item'].quantity
  })
  return cart
}

module.exports = {
  User,
  Wine,
  Order
}
