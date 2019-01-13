import React, {Component} from 'react'
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
const handleChange = event => {
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
  constructor() {
    super()
    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px'
      // firstName: '',
      // lastName: '',
      // address: '',
      // addressTwo: '',
      // city: '',
      // state: '',
      // zip: ''
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({elementFontSize: '14px'})
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== '18px'
      ) {
        this.setState({elementFontSize: '18px'})
      }
    })
  }

  render() {
    const {elementFontSize} = this.state
    return (
      <div className="Checkout">
        <h1>Checkout</h1>
        <form id="name-address-form">
          <div>
            <label>First name</label>
            <br />
            <input
              name="first-name"
              type="text"
              onChange={handleChange}
              value={this.state.firstName}
            />
          </div>
          <div>
            <label>Last name</label>
            <br />
            <input
              name="last-name"
              type="text"
              onChange={handleChange}
              value={this.state.lastName}
            />
          </div>
          <div>
            <label>Address</label>
            <br />
            <input
              name="address-1"
              type="text"
              onChange={this.handleChange}
              value={this.state.address}
            />
          </div>
          <div>
            <label>Address 2 (optional)</label>
            <br />
            <input
              name="address-2"
              type="text"
              onChange={this.handleChange}
              value={this.state.addressTwo}
            />
          </div>
          <div>
            <label>City</label>
            <br />
            <input
              name="city"
              type="text"
              onChange={this.handleChange}
              value={this.state.city}
            />
          </div>
          <div>
            <label>State</label>
            <br />
            <input
              name="state"
              type="text"
              onChange={this.handleChange}
              value={this.state.state}
            />
            <div>
              <label>Zip</label>
              <br />
              <input
                name="zip"
                type="text"
                onChange={this.handleChange}
                value={this.state.zip}
              />
            </div>
          </div>
        </form>
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
