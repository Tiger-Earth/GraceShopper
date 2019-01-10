import React, {Component} from 'react'

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
      <button type="button" onClick={props.clickHandler}>
        Add to Cart
      </button>
    </div>
  )
}

export default SingleWine
