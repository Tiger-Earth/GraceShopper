import React from 'react'
import SingleWineQuantityForm from './SingleWineQuantityForm'
import Typography from '@material-ui/core/Typography'

const SingleWine = props => {
  const wine = props.wine
  const addToCart = props.addToCart
  const {name, price, color, imageURL} = wine
  console.log('addToCart', addToCart)
  console.log('wine', wine)
  console.log(props)
  return (
    <div>
      <Typography color="inherit" variant="h5">
        {name} - {color}
      </Typography>
      <img src={imageURL} />
      <Typography color="inherit" variant="h5">
        ${price}.00
      </Typography>

      <SingleWineQuantityForm
        getQuantity={quantity => props.clickHandler(quantity)}
      />
    </div>
  )
}

export default SingleWine
