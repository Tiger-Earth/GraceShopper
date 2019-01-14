import React, {Component} from 'react'
import CartThumbnail from './CartThumbnail'
import AddressForm from './AddressForm'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  Elements,
  injectStripe
} from 'react-stripe-elements'
import Axios from 'axios'

//EVENT HANDLERS to be filled in as desired
const handleBlur = () => {
  console.log('[blur]')
}
const handleChange = () => {
  console.log('[change]')
}
const handleClick = () => {
  console.log('[click]')
}
const handleFocus = () => {
  console.log('[focus]')
}
const handleReady = () => {
  console.log('[ready]')
}

//for adding style
const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4'
        },
        padding
      },
      invalid: {
        color: '#9e2146'
      }
    }
  }
}

//---CONSTITUENT ELEMENTS---
//_SplitForm and _PaymentRequestForm are "injected" with stripe to
//become fully functional elements in Checkout component below

const _SplitForm = props => {
  const {submit} = props
  return (
    <form onSubmit={submit}>
      <label>
        Card number
        <CardNumberElement
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          {...createOptions(props.fontSize)}
        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          {...createOptions(props.fontSize)}
        />
      </label>
      <label>
        CVC
        <CardCVCElement
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          {...createOptions(props.fontSize)}
        />
      </label>
      <label>
        Postal code
        <PostalCodeElement
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          {...createOptions(props.fontSize)}
        />
      </label>
      <button type="submit">Send</button>
    </form>
  )
}
const SplitForm = injectStripe(_SplitForm)

//---ACTUAL CHECKOUT COMPONENT---

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      differentBillingAddress: false,
      complete: false
    }
    this.submit = this.submit.bind(this)
  }

  submit = async function(ev) {
    console.log('YO SUBMIT')
    console.log(this.props)
    ev.preventDefault()
    try {
      console.log('IN PROPS STRIPE')
      const {token} = await this.props.stripe.createToken()
      const response = await fetch('/charge', {
        method: 'POST',
        headers: {'Content-Type': 'text/plain'},
        body: token.id
      })
      if (response.ok) this.setState({complete: true})
    } catch (err) {
      console.log(err)
    }
  }

  handleClick() {
    this.setState({
      differentBillingAddress: true
    })
  }

  render() {
    const {elementFontSize} = this.state
    return this.state.complete ? (
      <h3>thank you for your order :)</h3>
    ) : (
      <div className="Checkout">
        <h1>Checkout</h1>
        <CartThumbnail />
        <AddressForm hideName={false} />
        <input
          type="checkbox"
          name="separateaddress"
          onClick={this.handleClick}
        />{' '}
        <label>I have a separate billing address</label>
        <br />
        {this.state.differentBillingAddress && (
          <div>
            <p>billing address:</p>
            <AddressForm billing={true} />
          </div>
        )}
        <Elements>
          <SplitForm fontSize={elementFontSize} submit={this.submit} />
        </Elements>
      </div>
    )
  }
}

export default Checkout
