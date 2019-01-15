import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, getWines} from '../../store'
import {Link} from 'react-router-dom'
import OrderDetails from '../OrderDetails'
import Button from '@material-ui/core/Button'
import EmptyCart from './EmptyCart'

export class Cart extends Component {
  componentDidMount() {
    this.props.getWines()
  }
  render() {
    const cart = Object.entries(this.props.cart).map(([key, val]) => {
      const wineInfo = this.props.allWines.filter(wine => +wine.id === +key)[0]
      return {...wineInfo, quantity: val}
    })
    let prices = cart.map((wine, idx) => wine.price * this.props.cart[wine.id])
    const total = prices.reduce((tot, x) => tot + x, 0)
    return (
      <div id="display-cart">
        {cart.length ? (
          <div>
            <OrderDetails wines={cart} total={total} />
            <Link to="/checkout">
              <Button
                size="large"
                variant="outlined"
                type="submit"
                style={{justifyContent: 'center'}}
              >
                Checkout
              </Button>
            </Link>
          </div>
        ) : (
          <EmptyCart />
        )}
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
