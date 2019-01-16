import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox from '@material-ui/core/Checkbox'
import {connect} from 'react-redux'
import {setInfo} from '../../store/address'

class AddressForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      billing: this.props.billing
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
    let {firstName, lastName, address1, address2, city, state, zip} = this.state
    let name = `${firstName} ${lastName}`
    let shippingAddress = !this.props.billing
      ? `${address1} ${address2} ${city} ${state} ${zip}`
      : ''
    this.props.setInfo({name, shippingAddress})
  }

  handleSubmit(ev) {
    ev.preventDefault()
  }

  render() {
    const handleChange = this.handleChange

    return (
      <div id="address-form">
        {this.state.billing ? (
          <Typography variant="h6" gutterBottom>
            Billing Address
          </Typography>
        ) : (
          <Typography variant="h6" gutterBottom>
            Shipping Address
          </Typography>
        )}
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="fname"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="lname"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="billing address-line1"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="billing address-line2"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="billing address-level2"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="billing postal-code"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="billing country"
              onChange={handleChange}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid> */}
        </Grid>
      </div>
    )
  }
}

// export default AddressForm;

const mapState = state => {
  return {
    address: state.address
  }
}

const mapDispatch = dispatch => {
  return {
    setInfo: obj => dispatch(setInfo(obj))
  }
}

export default connect(mapState, mapDispatch)(AddressForm)
