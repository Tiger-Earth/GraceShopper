import React from 'react'
import {connect} from 'react-redux'
import {getWines} from '../store'
import WinesIcon from './winesIcon'

class WinesList extends React.Component {
  componentDidMount() {
    return this.props.getWines()
  }

  render() {
    return (
      <div id="all-wines">{wines.map(wine => <WineIcon wine={wine} />)}</div>
    )
  }
}

const mapState = state => {
  return {
    wines: state.allWines
  }
}

const mapDispatch = dispatch => {
  return {
    getWines: () => dispatch(getWines())
  }
}

export default connect(mapState, mapDispatch)(WinesList)
