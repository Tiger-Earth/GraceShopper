import React, {Component} from 'react'
import CartThumbnail from './CartThumbnail'
import AddressForm from './AddressForm'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  PaymentRequestButtonElement,
  Elements,
  injectStripe
} from 'react-stripe-elements'

//to be filled in as desired
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

class _SplitForm extends Component {
  handleSubmit = ev => {
    ev.preventDefault()
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then(payload => console.log('[token]', payload))
    } else {
      console.log("Stripe.js hasn't loaded yet.")
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Card number
          <CardNumberElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          CVC
          <CardCVCElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Postal code
          <PostalCodeElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <button>Pay</button>
      </form>
    )
  }
}
const SplitForm = injectStripe(_SplitForm)

class _PaymentRequestForm extends React.Component {
  constructor(props) {
    super(props)

    const paymentRequest = props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: 1000
      }
    })

    paymentRequest.on('token', ({complete, token, ...data}) => {
      console.log('Received Stripe token: ', token)
      console.log('Received customer information: ', data)
      complete('success')
    })

    paymentRequest.canMakePayment().then(result => {
      this.setState({canMakePayment: !!result})
    })

    this.state = {
      canMakePayment: false,
      paymentRequest
    }
  }

  render() {
    return this.state.canMakePayment ? (
      <PaymentRequestButtonElement
        className="PaymentRequestButton"
        onBlur={handleBlur}
        onClick={handleClick}
        onFocus={handleFocus}
        onReady={handleReady}
        paymentRequest={this.state.paymentRequest}
        style={{
          paymentRequestButton: {
            theme: 'dark',
            height: '64px',
            type: 'donate'
          }
        }}
      />
    ) : null
  }
}
const PaymentRequestForm = injectStripe(_PaymentRequestForm)

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      differentBillingAddress: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      differentBillingAddress: true
    })
  }

  render() {
    const {elementFontSize} = this.state
    return (
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
        {this.state.differentBillingAddress && (
          <div>
            <p>billing address</p>
            <AddressForm hideName={true} />
          </div>
        )}
        <Elements>
          <SplitForm fontSize={elementFontSize} />
        </Elements>
        <Elements>
          <PaymentRequestForm />
        </Elements>
      </div>
    )
  }
}

export default Checkout
