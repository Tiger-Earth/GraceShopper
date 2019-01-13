import React from 'react'
import {FiShoppingBag} from 'react-icons/fi'

const CartIcon = props => {
  const cart = props.cart
  const totalArray = Object.values(cart)
  const total = totalArray.reduce((acc, el) => acc + el)
  return (
    <div id="cartIcon">
      <FiShoppingBag />
      {total}
    </div>
  )
}

export default CartIcon
