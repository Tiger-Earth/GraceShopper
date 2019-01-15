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
    const numQuant = parseInt(event.target.value)
    quantityChange(event.target.id, numQuant)
  }

  render() {
    const cart = Object.entries(this.props.cart).map(([key, val]) => {
      const wineInfo = this.props.allWines.filter(wine => +wine.id === +key)[0]
      return {...wineInfo, quantity: val}
    })
    let prices = cart.map(wine => wine.price * this.props.cart[wine.id])
    const total = !prices.length
      ? 0
      : prices.reduce((tot, x) => (x ? tot + x : tot), 0)
    return (
      <div>
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
