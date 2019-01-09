import React from 'react'
import {connect} from 'react-redux'
import {getWines} from '../store/allWines'
import WinesIcon from './winesIcon'

class WinesList extends React.Component {
  componentDidMount() {
    return this.props.getWines()
  }

  render() {
    return (
      <div id="all-wines" className="flex-container">
        {this.props.wines.map(wine => <WinesIcon wine={wine} key={wine.id} />)}
      </div>
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
