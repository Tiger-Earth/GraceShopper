import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'

export const EmptyOrderHistory = () => {
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
            You Haven't Made An Order Before! Keep Shopping!
          </Button>
        </Link>
        <CardMedia
          style={{height: 0, paddingTop: '56.25%', borderRadius: 5}}
          image="https://assets.bonappetit.com/photos/5aaff21a275dc52331d91a6b/16:9/w_1280,c_limit/skin-contact-wines-lede.jpg"
        />
      </Card>
    </div>
  )
}
export default EmptyOrderHistory
