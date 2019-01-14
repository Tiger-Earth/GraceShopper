import React from 'react'
import {Link} from 'react-router-dom'

const WinesIcon = props => {
  const {id, name, price, color, imageURL} = props.wine

  const tens = Math.floor(price / 100)
  const pennies = price % 100
  return (
    <div id="wine-icon" className="flex-icon">
      <Link to={`/wines/${id}`}>
        <img src={imageURL} />
        <div className="wine-text">
          <h4>{name}</h4>
          <h5>
            {color} - ${tens}.{pennies}
          </h5>
        </div>
      </Link>
    </div>
  )
}

export default WinesIcon
