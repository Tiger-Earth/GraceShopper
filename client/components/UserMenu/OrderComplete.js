import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../../store'
import OrderDetails from './OrderDetails'

class OrderHistory extends Component {
  componentDidMount() {
    this.props.fetchOrders()
  }
  render() {
    return (
      <div>
        <h1>Order History</h1>
        {this.props.orders
          .filter(order => order.status === 'closed')
          .map(order => <OrderDetails key={order.id} order={order} />)}
        <CardMedia
          style={{height: 0, paddingTop: '56.25%', borderRadius: 5}}
          image="https://assets.bonappetit.com/photos/57ae42641b33404414975c3f/16:9/w_1280,c_limit/wildair-new-york-restaurant-bar-main-use-this-.jpg"
        />
      </div>
    )
  }
}
