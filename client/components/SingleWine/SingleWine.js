import React, {Component} from 'react'

const SingleWine = ({wine}) => {
  const {name, price, color, imageURL} = wine
  return (
    <div>
      <p>
        {name} ${price}
      </p>
      <img src={imageURL} />
      <p>Color: {color} </p>
    </div>
  )
}

export default SingleWine
