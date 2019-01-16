import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../../store'
import OrderDetails from '../OrderDetails'
import EmptyOrderHistory from './EmptyOrderHistory'

class OrderHistory extends Component {
  componentDidMount() {
    this.props.fetchOrders()
  }
  render() {
    const closedOrders = this.props.orders.filter(
      order => order.status === 'closed'
    )
    return (
      <div>
        <h1>Order History</h1>
        {closedOrders.length > 0 ? (
          closedOrders
            .filter(order => order.status === 'closed')
            .map(order => <OrderDetails key={order.id} order={order} />)
        ) : (
          <EmptyOrderHistory />
        )}
      </div>
    )
  }
}

OrderHistory.defaultProps = {
  orders: []
}

const mapStateToProps = state => ({
  orders: state.user.orders
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
