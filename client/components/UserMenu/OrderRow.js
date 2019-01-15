import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const OrderRow = props => {
  const {wine} = props
  return (
    wine && (
      <TableRow key={wine.id}>
        <TableCell>{wine.name}</TableCell>
        <TableCell align="right">{wine['order-item'].quantity}</TableCell>
        <TableCell align="right">
          {Math.floor(wine.price / 100)}.{wine.price % 100}
        </TableCell>
      </TableRow>
    )
  )
}

export default OrderRow
