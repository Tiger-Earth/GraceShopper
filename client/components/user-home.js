import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import WinesList from './WineList/winesList'
import {updateDatabaseCart} from '../store'

/**
 * COMPONENT
 */

class UserHome extends Component {
  componentDidMount() {
    this.props.hitDatabase()
  }

  render() {
    // const {email} = this.props

    return (
      <div>
        {/* <h3>Welcome, {email}</h3> */}
        <WinesList />
      </div>
    )
  }
}

// export default UserHome;

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    hitDatabase: () => dispatch(updateDatabaseCart())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
