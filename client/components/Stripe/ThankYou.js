import React, {Component} from 'react'
import {CardMedia} from '@material-ui/core'

export class ThankYou extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div id="thank-you">
        <div id="thank-you-div">
          <p>Thank you for your order!</p>
        </div>
      </div>
    )
  }
}
