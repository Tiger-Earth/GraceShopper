import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const CartRow = props => {
  const {wine, handleChange} = props

  return (
    <div>
      {wine.quantity && (
        <TableRow key={wine.id}>
          <TableCell>
            {wine.name}
            <img src={wine.imageURL} />
          </TableCell>
          <td>
            <select
              type="number"
              id={wine.id}
              defaultValue={wine.quantity}
              onChange={handleChange}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </td>
          <TableCell align="right">
            {Math.floor(wine.price / 100)}.{wine.price % 100}
          </TableCell>
        </TableRow>
      )}
    </div>
  )
}

export default CartRow
