import React from 'react'
import {connect} from 'react-redux'
import {getWines} from '../../store/allWines'
import WinesIcon from './winesIcon'
import SortFilter from '../SortFilter'

export class WinesList extends React.Component {
  constructor() {
    super()
    this.filterWines = this.filterWines.bind(this)
  }
  componentDidMount() {
    //the conditional is here to make it possible for the first test spec to run.
    if (this.props.getWines) return this.props.getWines()
  }

  filterWines(filters) {
    const wines = this.props.wines
    this.props.wines = wines.filter(wine => {
      return filters.every(filter => filter(wine))
    })
  }

  render() {
    return (
      <SortFilter id="all-wines" filterWines={this.filterWines}>
        <div className="wine-grid">
          {this.props.wines.map(wine => (
            <WinesIcon wine={wine} key={wine.id} />
          ))}
        </div>
      </SortFilter>
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
