import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../../store/cart'

//TODO: this and the spec file are not complete!

export class Cart extends React.Component {
  componentDidMount() {
    //the conditional is here to make it possible for the first test spec to run.
    if (this.props.fetchCart) return this.props.fetchCart()
  }

  render() {
    return (
      <div id="cart-view" className="flex-container">
        {this.props.cartItems.map(cartItem => (
          <h2>
            {cartItem.id}
            {cartItem.quantity}
          </h2>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartItems: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
