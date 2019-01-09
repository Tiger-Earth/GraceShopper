import React from 'react'
import {Link} from 'react-router-dom'

const WinesIcon = props => {
  const {id, name, price, color, imageURL} = props.wine
  return (
    <div id="wine-icon" className="flex-icon">
      <Link to={`/wines/${id}`}>
        <img src={imageURL} />
        <h2>{name}</h2>
        <h3>{color}</h3>
        <h3>{price}</h3>
      </Link>
    </div>
  )
}

export default WinesIcon
