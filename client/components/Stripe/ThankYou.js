import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'

export class ThankYou extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <React.Fragment>
        <Link to="/">
          <Button
            size="large"
            variant="outlined"
            type="submit"
            style={{position: 'relative', left: 500, right: 475, top: 110}}
          >
            Thank you for your order!
          </Button>
        </Link>
        <CardMedia
          style={{height: 0, paddingTop: '56.25%', borderRadius: 5}}
          image="https://assets.bonappetit.com/photos/57ae42641b33404414975c3f/16:9/w_2560,c_limit/wildair-new-york-restaurant-bar-main-use-this-.jpg"
        />
      </React.Fragment>
    )
  }
}
