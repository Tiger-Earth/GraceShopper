import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import AddressForm from './AddressForm'
import {fetchCart, getCart} from '../../store/cart'
import {fetchWine} from '../../store/wine'
import axios from 'axios'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {complete: false, billing: false, total: ''}
    this.submit = this.submit.bind(this)
  }

  async componentDidMount() {
    const wines = await Promise.all(
      Object.keys(this.props.cart).map(id => this.props.fetchWine(id))
    )
    const prices = wines.map(
      (wine, idx) => wine.price * this.props.cart[wine.id]
    )
    const total = prices.reduce((tot, x) => tot + x, 0)
    this.setState({total})
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await axios.post('/charge', {
      tokenId: token.id,
      amount: this.state.total,
      order: this.props.cart
    })
    //clearCart
    //close the order with
    console.log('response', response)
    if (response.status === 200) {
      this.setState({complete: true})
      this.props.clearCart()
    }
    //createNew
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>
    return (
      <div className="checkout">
        <h1>your total: {this.state.total}</h1>
        <AddressForm hideName={false} />
        <input
          type="checkbox"
          name="separateaddress"
          onClick={() => this.setState({billing: !this.state.billing})}
        />{' '}
        <label>I have a separate billing address</label>
        <br />
        {this.state.billing && (
          <div>
            <p>billing address:</p>
            <AddressForm billing={true} />
          </div>
        )}
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button type="submit" onClick={this.submit}>
          Send
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    fetchWine: id => dispatch(fetchWine(id)),
    clearCart: () => dispatch(getCart({}))
  }
}

const injectedCheckout = injectStripe(CheckoutForm)

export default connect(mapState, mapDispatch)(injectedCheckout)
