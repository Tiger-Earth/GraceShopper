import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../../store'

export class Cart extends Component {
  render() {
    console.log('PROPS', this.props)
    return (
      <div>
        <h2>Your Shopping Cart:</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            <tr>
              <th />
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  fetchCart: dispatch(fetchCart())
})

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default ConnectedCart
