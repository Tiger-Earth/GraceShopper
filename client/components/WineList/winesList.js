import React from 'react'
import {connect} from 'react-redux'
import {getWines} from '../../store/allWines'
import WinesIcon from './winesIcon'
import SortFilter from '../SortFilter/Grid'

const filterPrice = priceCategory => {
  if (priceCategory === 'low') {
    return wine => 0 <= wine.price / 100 && wine.price / 100 < 25
  } else if (priceCategory === 'mid') {
    return wine => 25 <= wine.price / 100 && wine.price / 100 < 50
  } else {
    if (!priceCategory) return () => true
    return wine => wine.price / 100 >= 50
  }
}

const filterColor = filters => {
  const possibleColors = []
  if (filters.checkedRed) {
    possibleColors.push('Red')
  }
  if (filters.checkedWhite) {
    possibleColors.push('White')
  }
  if (filters.checkedRose) {
    possibleColors.push('Rose')
  }
  return wine =>
    possibleColors.length ? possibleColors.includes(wine.color) : false
}

const filterFuncs = filters => {
  return [filterPrice(filters.price), filterColor(filters)]
}

export class WinesList extends React.Component {
  componentDidMount() {
    //the conditional is here to make it possible for the first test spec to run.
    if (this.props.getWines) return this.props.getWines()
  }

  render() {
    const filters = filterFuncs(this.props.filters)
    const filteredWines = this.props.wines.filter(wine => {
      return filters.every(filter => filter(wine))
    })
    if (filters.sortBy === 'low to high') {
      filteredWines.sort((a, b) => a.price - b.price)
    } else if (this.props.filters.sortBy === 'high to low') {
      filteredWines.sort((a, b) => b.price - a.price)
    }

    return (
      <SortFilter id="all-wines">
        <div className="wine-grid">
          {filteredWines.map(wine => <WinesIcon wine={wine} key={wine.id} />)}
        </div>
      </SortFilter>
    )
  }
}

const mapState = state => {
  return {
    wines: state.allWines,
    filters: state.winesVisibilityFilters
  }
}

const mapDispatch = dispatch => {
  return {
    getWines: () => dispatch(getWines())
  }
}

export default connect(mapState, mapDispatch)(WinesList)
