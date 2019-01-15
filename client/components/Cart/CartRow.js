import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const CartRow = props => {
  const {wine} = props
  return (
    <TableRow key={wine.id}>
      <TableCell>
        {wine.name}
        <img src={wine.imageURL} />
      </TableCell>
      <TableCell align="right">{wine.quantity}</TableCell>
      <TableCell align="right">
        {Math.floor(wine.price / 100)}.{wine.price % 100}
      </TableCell>
    </TableRow>
  )
}

export default CartRow
