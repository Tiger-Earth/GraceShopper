import React from 'react'
import {CardMedia} from '@material-ui/core'

export const ThankYou = () => {
  return (
    <div id="thank-you">
      <p>Thank you for your order!</p>
      <CardMedia
        style={{height: 0, paddingTop: '56.25%', borderRadius: 5}}
        image="https://assets.bonappetit.com/photos/57ae42641b33404414975c3f/16:9/w_2560,c_limit/wildair-new-york-restaurant-bar-main-use-this-.jpg"
      />
    </div>
  )
}
