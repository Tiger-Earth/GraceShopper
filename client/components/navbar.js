import React from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import CartIcon from './CartIcon'
import UserHome from './user-home'

const Navbar = ({handleClick, isLoggedIn, cart}) => (
  <div>
    <Link to="/">
      <h1>Tiger Shopper</h1>
    </Link>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <UserHome />
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
      <Link to="/cart">
        <CartIcon cart={cart} />
      </Link>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
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
