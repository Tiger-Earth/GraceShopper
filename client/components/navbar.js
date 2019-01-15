import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import UserMenu from './UserMenu/UserMenu'
// import UserH ome from './user-home'
import CartIcon from './CartIcon'
import {Typography, AppBar, Button} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'

const Navbar = ({isLoggedIn, cart, email}) => (
  <AppBar>
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Link to="/">
        <Button id="title">
          <Typography variant="h5">Tiger Wines</Typography>
        </Button>
      </Link>
      <nav>
        {isLoggedIn ? (
          // {/* The navbar will show these links after you log in */}

          <UserMenu />
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
        <Link to="/cart">
          <CartIcon cart={cart} />
        </Link>
      </nav>
    </Grid>
  </AppBar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart,
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
