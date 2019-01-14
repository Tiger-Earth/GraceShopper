import React from 'react'
import {FiShoppingBag} from 'react-icons/fi'

const CartIcon = props => {
  let total
  const cart = props.cart
  const totalArray = Object.values(cart)
  if (totalArray.length === 0) {
    total = undefined
  } else {
    total = totalArray.reduce((acc, el) => acc + el)
  }

  return (
    <a href="#" className="notification">
      <FiShoppingBag />
      {total ? <span className="badge">{total}</span> : ''}
    </a>
  )
}

export default CartIcon
