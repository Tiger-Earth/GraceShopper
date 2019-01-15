import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const CartRow = props => {
  const {wine} = props
  return (
    <TableRow key={wine.id}>
      <TableCell>{wine.name}</TableCell>
      <TableCell>
        <img src={wine.imageURL} style={{width: 150, border: 1}} />
      </TableCell>
      <TableCell align="right">{wine.quantity}</TableCell>
      <TableCell align="right">
        {Math.floor(wine.price / 100)}.{wine.price % 100}
      </TableCell>
    </TableRow>
  )
}

export default CartRow
