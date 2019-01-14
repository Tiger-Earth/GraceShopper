import React from 'react'

class AddressForm extends React.Component {
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
  }

  handleSubmit() {
    //TODO
    //where do we want the addresses to go?
    //(will check whether info is billing or shipping addy here before sending)
  }

  render() {
    const handleChange = this.handleChange
    return (
      <form id="name-address-form">
        {!this.state.billing && (
          <div>
            <label>First name</label>

            <input name="firstName" type="text" onChange={handleChange} />

            <label>Last name</label>

            <input name="lastName" type="text" onChange={handleChange} />
          </div>
        )}
        <div>
          <div>
            <label>Address</label>

            <input name="address1" type="text" onChange={handleChange} />
          </div>
          <div>
            <label>Address 2 (optional)</label>

            <input name="address2" type="text" onChange={handleChange} />
          </div>
          <div>
            <label>City</label>

            <input name="city" type="text" onChange={handleChange} />
          </div>
          <div>
            <label>State</label>

            <input name="state" type="text" onChange={handleChange} />
          </div>
          <div>
            <label>Zip</label>

            <input name="zip" type="text" onChange={handleChange} />
          </div>
        </div>
      </form>
    )
  }
}

export default AddressForm
