import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, fetchWine} from '../../store'

export class Cart extends Component {
  async componentDidMount() {
    const wineKeys = Object.keys(this.props.cart)
    const wineKeyNums = wineKeys.map(Number)
    const wines = await Promise.all(
      wineKeyNums.map(wineId => this.props.fetchWine(wineId))
    )
    console.log('WINES', wines)
    const quantities = Object.values(this.props.cart)
    console.log('quantities', quantities)
  }
  render() {
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
  fetchCart: () => dispatch(fetchCart()),
  fetchWine: id => dispatch(fetchWine(id))
})

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default ConnectedCart
