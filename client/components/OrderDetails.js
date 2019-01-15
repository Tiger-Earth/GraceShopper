import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import OrderRow from './UserMenu/OrderRow'
import CartRow from './Cart/CartRow'

const styles = () => ({
  root: {
    margin: '0px 100px 0px 100px'
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

function SpanningTable(props) {
  const {classes, order, handleChange} = props
  const wines = props.wines || (order && order.wines)
  const total = props.total !== undefined ? props.total : order && order.total
  return (
    <Paper className={classes.root}>
      {order && (
        <Toolbar className={classes.details}>
          <Typography variant="h6" color="inherit">
            Order Placed: {new Date(order.updatedAt).toDateString()}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Order #{order.id}
          </Typography>
        </Toolbar>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wines.map(
            wine =>
              order ? (
                <OrderRow wine={wine} key={wine.id} />
              ) : (
                <CartRow
                  wine={wine}
                  key={wine.id}
                  handleChange={handleChange}
                />
              )
          )}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={1}>Subtotal</TableCell>
            <TableCell align="right">
              {Math.floor(total / 100)}.{total % 100}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1}>Tax</TableCell>
            <TableCell align="right">0.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1}>Total</TableCell>
            <TableCell align="right">
              {Math.floor(total / 100)}.{total % 100}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(SpanningTable)
