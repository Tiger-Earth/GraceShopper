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

const styles = () => ({
  root: {
    margin: '0px 300px 0px 300px'
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

function SpanningTable(props) {
  const {classes, order} = props
  return (
    <Paper className={classes.root}>
      <Toolbar className={classes.details}>
        <Typography variant="h6" color="inherit">
          Order Placed: {new Date(order.updatedAt).toDateString()}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Order #{order.id}
        </Typography>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.wines.map(wine => {
            return (
              <TableRow key={wine.id}>
                <TableCell>{wine.name}</TableCell>
                <TableCell align="right">
                  {wine['order-item'].quantity}
                </TableCell>
                <TableCell align="right">{wine.price}.00</TableCell>
              </TableRow>
            )
          })}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={1}>Subtotal</TableCell>
            <TableCell align="right">{order.total}.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1}>Tax</TableCell>
            <TableCell align="right">0.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1}>Total</TableCell>
            <TableCell align="right">{order.total}.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(SpanningTable)
