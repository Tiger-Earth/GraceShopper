import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const OrderRow = props => {
  const {wine} = props
  return (
    <TableRow key={wine.id}>
      <TableCell>{wine.name}</TableCell>
      <TableCell align="right">{wine['order-item'].quantity}</TableCell>
      <TableCell align="right">{wine.price}.00</TableCell>
    </TableRow>
  )
}

export default OrderRow
