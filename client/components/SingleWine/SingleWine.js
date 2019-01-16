import React from 'react'
import SingleWineQuantityForm from './SingleWineQuantityForm'
import Typography from '@material-ui/core/Typography'

const SingleWine = props => {
  const wine = props.wine
  const {name, price, color, imageURL} = wine
  const tens = Math.floor(price / 100)
  const pennies = price % 100
  return (
    <div id="single-wine">
      <img src={imageURL} />
      <div id="single-wine-text">
        <Typography variant="h5">
          {name} - {color}
        </Typography>
        <Typography variant="h6" style={{margin: '10px 0px'}}>
          Price: ${tens}.{pennies}
        </Typography>

        <p />
        <SingleWineQuantityForm
          getQuantity={quantity => props.clickHandler(quantity)}
        />
      </div>
    </div>
  )
}

export default SingleWine
