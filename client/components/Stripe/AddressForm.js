import React from 'react'

//will make this a stateful component soon
class AddressForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // firstName: '',
      // lastName: '',
      //etc
      hideName: this.props.hideName
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    console.log('change')
  }

  render() {
    const handleChange = this.handleChange
    return (
      <form id="name-address-form">
        {!this.state.hideName && (
          <div>
            <div>
              <label>First name</label>
              <br />
              <input name="first-name" type="text" onChange={handleChange} />
            </div>
            <div>
              <label>Last name</label>
              <br />
              <input name="last-name" type="text" onChange={handleChange} />
            </div>
          </div>
        )}
        <div>
          <div>
            <label>Address</label>
            <br />
            <input name="address-1" type="text" onChange={handleChange} />
          </div>
          <div>
            <label>Address 2 (optional)</label>
            <br />
            <input name="address-2" type="text" onChange={handleChange} />
          </div>
          <div>
            <label>City</label>
            <br />
            <input name="city" type="text" onChange={handleChange} />
          </div>
          <div>
            <label>State</label>
            <br />
            <input name="state" type="text" onChange={handleChange} />
          </div>
          <div>
            <label>Zip</label>
            <br />
            <input name="zip" type="text" onChange={handleChange} />
          </div>
        </div>
      </form>
    )
  }
}

export default AddressForm
