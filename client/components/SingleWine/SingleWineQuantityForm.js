import React, {Component} from 'react'
import {Fab} from '@material-ui/core'
import NativeSelect from '@material-ui/core/NativeSelect'

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
        <NativeSelect
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.quantity}
        >
          {Array.from({length: 10}, (v, k) => k + 1).map(val => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </NativeSelect>
        <Fab type="submit" variant="extended" size="small" color="secondary">
          Add to Cart
        </Fab>
      </form>
    )
  }
}
