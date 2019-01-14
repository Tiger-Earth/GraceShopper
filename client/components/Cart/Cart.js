import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, getWines} from '../../store'

export class Cart extends Component {
  componentDidMount() {
    this.props.getWines()
  }

  render() {
    const cartWines = this.props.allWines
    console.log('CART WINES', cartWines)
    const cart = Object.entries(this.props.cart).map(([key, val]) => {
      const wineInfo = this.props.allWines.filter(wine => +wine.id === +key)[0]
      return {...wineInfo, quantity: val}
    })
    let prices = cart.map((wine, idx) => wine.price * this.props.cart[wine.id])
    const total = prices.reduce((tot, x) => tot + x, 0)
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
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total: {total}</h3>
        <button type="submit">Checkout</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  allWines: state.allWines
})

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  getWines: () => dispatch(getWines())
})

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default ConnectedCart
