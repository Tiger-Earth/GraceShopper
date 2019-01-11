import React, {Component} from 'react'

export default class SingleWineQuantityForm extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.getQuantity(this.state.quantity)
    this.setState({
      quantity: 1
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select onChange={this.handleChange} value={this.state.quantity}>
          {Array.from({length: 10}, (v, k) => k + 1).map(val => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
        <button type="submit">Add to Cart</button>
      </form>
    )
  }
}
