import React from 'react'
import Badge from '@material-ui/core/Badge'
import {withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core/'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  }
})

const CartIcon = props => {
  let total
  const cart = props.cart || {}
  const totalArray = Object.values(cart)
  if (totalArray.length === 0) {
    total = 0
  } else {
    total = totalArray.reduce((acc, el) => acc + el)
  }

  return (
    <Button>
      <Badge badgeContent={total} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </Button>
  )
}

export default withStyles(styles)(CartIcon)
