import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import NativeSelect from '@material-ui/core/NativeSelect'

const CartRow = props => {
  const {wine, handleChange} = props

  return (
    wine.quantity && (
      <TableRow key={wine.id}>
        <TableCell id="cart-row">
          <img
            src={wine.imageURL}
            style={{width: 150, height: 150, border: 1}}
          />
          <Typography variant="h5" id="cart-name">
            {' '}
            {wine.name}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <NativeSelect
            variant="outlined"
            type="number"
            id={wine.id}
            defaultValue={wine.quantity}
            onChange={handleChange}
          >
            {Array.from({length: 10}, (v, k) => k + 1).map(val => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </NativeSelect>
        </TableCell>
        <TableCell align="right">
          {Math.floor(wine.price / 100)}.{wine.price % 100}
        </TableCell>
      </TableRow>
    )
  )
}

export default CartRow
