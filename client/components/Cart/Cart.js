import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, getWines, updateCart, deleteFromCart} from '../../store'
import {Link} from 'react-router-dom'
import OrderDetails from '../OrderDetails'

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getWines()
  }

  handleChange(event) {
    const quantityChange = (id, quant) => {
      quant === '0'
        ? this.props.deleteFromCart(id)
        : this.props.updateCart(id, quant)
    }
    quantityChange(event.target.id, event.target.value)
  }

  render() {
    const cart = Object.entries(this.props.cart).map(([key, val]) => {
      const wineInfo = this.props.allWines.filter(wine => +wine.id === +key)[0]
      return {...wineInfo, quantity: val}
    })
    let prices = cart.map(wine => wine.price * this.props.cart[wine.id])
    const total = prices.reduce((tot, x) => tot + x, 0)
    return (
      <div>
        <h2>Your Shopping Cart:</h2>
        {/* <table>
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
                <td>
                  <select
                    type="number"
                    id={item.id}
                    defaultValue={item.quantity}
                    onChange={this.handleChange}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <h3>Total: {total}</h3>
        <div id="display-cart">
          <OrderDetails
            wines={cart}
            total={total}
            handleChange={this.handleChange}
          />
          <Link to="/checkout">
            <button type="submit">Checkout</button>
          </Link>
        </div>
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
  getWines: () => dispatch(getWines()),
  updateCart: (id, quant) => dispatch(updateCart(id, quant)),
  deleteFromCart: id => dispatch(deleteFromCart(id))
})

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default ConnectedCart
