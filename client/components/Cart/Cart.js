import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, fetchWine} from '../../store'

export class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart()
    this.props.fetchWine()
  }
  render() {
    const wines = Promise.All(
      Object.keys(this.props.cart).map(wineId => fetchWine(wineId))
    )
    const quantities = Object.values(this.props.cart)
    console.log('WINES AND QUANTITY', wines, quantities)
    console.log('PROPS', this.props.cart)
    return (
      <div>
        <h2>Your Shopping Cart:</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th />
              <th>Price</th>
              <th />
              <th>Quantity</th>
            </tr>
            {/* {this.props.map(item => (
              <tr key={item.id}>
                <th>{item.name}</th>
                <th />
                <th>{item.price}</th>
                <th />
                <th>{item.quantity}</th>
              </tr>
            ))} */}
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
  fetchCart: dispatch(fetchCart()),
  fetchWine: dispatch(fetchWine())
})

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default ConnectedCart
