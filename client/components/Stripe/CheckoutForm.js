import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
var stripe = Stripe('pk_test_L9BQ0CbpUNhek1oWjCzkX9pj')
var elements = stripe.elements()

var style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    color: '#32325d'
  }
}
// Create an instance of the card Element.
var card = elements.create('card', {style: style})
// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element')

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {complete: false}
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })

    if (response.ok) this.setState({complete: true})
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>
    return (
      <div className="checkout">
        <script src="https://js.stripe.com/v3/" />
        <form action="/charge" method="post" id="payment-form">
          <div className="form-row">
            <label name="card-element">Credit or debit card</label>
            <div id="card-element" />
            {/* for card errors */}
            <div id="card-errors" role="alert" />
          </div>
          <p>Would you like to complete the purchase?</p>
          <CardElement />
          <button type="submit" onClick={this.submit}>
            Send
          </button>
        </form>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
