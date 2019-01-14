import React from 'react'
import {FiShoppingBag} from 'react-icons/fi'

const CartIcon = props => {
  const cart = props.cart
  const totalArray = Object.values(cart)
  const total = totalArray.reduce((acc, el) => acc + el)
  return (
    // <div className="cart-notification">
    //   <FiShoppingBag id="shopping-cart" />
    //   <div className="badge">{total}</div>
    // </div>
    <a href="#" className="notification">
      <FiShoppingBag />
      <span className="badge">{total}</span>
    </a>
  )
}

export default CartIcon
