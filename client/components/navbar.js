import React from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Typography, AppBar} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'

const Navbar = ({handleClick, isLoggedIn}) => (
  // <AppBar color="primary">
  <Grid container direction="row" justify="space-between" alignItems="center">
    <Typography color="inherit" variant="h4">
      Tiger Shopper
    </Typography>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  </Grid>
  // </AppBar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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
