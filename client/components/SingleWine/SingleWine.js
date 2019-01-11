import React, {Component} from 'react'
import SingleWineQuantityForm from './SingleWineQuantityForm'

const SingleWine = props => {
  const wine = props.wine
  const addToCart = props.addToCart
  const {id, name, price, color, imageURL} = wine
  console.log('addToCart', addToCart)
  console.log('wine', wine)
  console.log(props)
  return (
    <div>
      <p>
        {name} ${price}.00
      </p>
      <img src={imageURL} />
      <p>Color: {color} </p>
      <SingleWineQuantityForm
        getQuantity={quantity => props.clickHandler(quantity)}
      />
    </div>
  )
}

export default SingleWine
