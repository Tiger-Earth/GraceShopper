import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import AddressForm from './AddressForm'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {complete: false, billing: false}
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

export default injectStripe(CheckoutForm)

// import React, {Component} from 'react'
// import AddressForm from './AddressForm'
// import {
//   CardNumberElement,
//   CardExpiryElement,
//   CardCVCElement,
//   PostalCodeElement,
//   Elements,
//   injectStripe
// } from 'react-stripe-elements'

// //---CONSTITUENT ELEMENTS---
// //_SplitForm and _PaymentRequestForm are "injected" with stripe to
// //become fully functional elements in Checkout component below

// //---ACTUAL CHECKOUT COMPONENT---

// class _Checkout extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       differentBillingAddress: false,
//       complete: false
//     }
//     this.submit = this.submit.bind(this)
//   }

//   submit = async function(ev) {
//     ev.preventDefault()
//     try {
//       console.log('IN PROPS STRIPE')
//       const {token} = await this.props.stripe.createToken()
//       const response = await fetch('/charge', {
//         method: 'POST',
//         headers: {'Content-Type': 'text/plain'},
//         body: token.id
//       })
//       if (response.ok) this.setState({complete: true})
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   handleClick() {
//     this.setState({
//       differentBillingAddress: true
//     })
//   }

//   render() {
//     const submit = this.submit
//     return this.state.complete ? (
//       <h3>thank you for your order :)</h3>
//     ) : (
//       <div className="Checkout">
//         <h1>Checkout</h1>
//         <AddressForm hideName={false} />
//         <input
//           type="checkbox"
//           name="separateaddress"
//           onClick={this.handleClick}
//         />{' '}
//         <label>I have a separate billing address</label>
//         <br />
//         {this.state.differentBillingAddress && (
//           <div>
//             <p>billing address:</p>
//             <AddressForm billing={true} />
//           </div>
//         )}
//         <Elements>
//         <form onSubmit={submit}>
//       <label>
//         Card number
//         <CardNumberElement
//         />
//       </label>
//       <label>
//         Expiration date
//         <CardExpiryElement
//         />
//       </label>
//       <label>
//         CVC
//         <CardCVCElement
//         />
//       </label>
//       <label>
//         Postal code
//         <PostalCodeElement
//         />
//       </label>
//       <button type="submit">Send</button>
//     </form>
//         </Elements>
//       </div>
//     )
//   }
// }

// export default injectStripe(_Checkout)
