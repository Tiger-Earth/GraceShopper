import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'

export const EmptyCart = () => {
  return (
    <div>
      <Card>
        <Link to="/">
          <Button
            size="large"
            variant="contained"
            type="submit"
            style={{position: 'relative', left: 500, right: 475, top: 50}}
          >
            Your Cart Is Empty, Keep Shopping
          </Button>
        </Link>
        <CardMedia
          style={{height: 0, paddingTop: '56.25%', borderRadius: 5}}
          image="https://assets.bonappetit.com/photos/5a9f097afc24be1b59dc41d8/16:9/w_1028,c_limit/writing%20wines%20banner%202.jpg"
        />
      </Card>
    </div>
  )
}

export default EmptyCart
