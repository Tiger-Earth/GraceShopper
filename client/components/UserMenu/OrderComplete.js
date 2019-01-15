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
      </div>
    )
  }
}
