import React from 'react'
import {connect} from 'react-redux'
import {getWines} from '../../store/allWines'
import WinesIcon from './winesIcon'
import SortFilter from '../SortFilter/Grid'

const filterFuncs = filters => {
  const defaultFilter = () => true
  return Object.keys(filters).map(filter => {
    switch (filter) {
      case 'checkedRed':
        if (filters.checkedRed) return wine => wine.color === 'Red'
        return defaultFilter
      case 'checkedWhite':
        if (filters.checkedWhite) return wine => wine.color === 'White'
        return defaultFilter
      case 'price': {
        const price_category = filters[filter]
        if (price_category === 'low') {
          return wine => 0 <= wine.price / 100 && wine.price / 100 < 25
        } else if (price_category === 'mid') {
          return wine => 25 <= wine.price / 100 && wine.price / 100 < 50
        } else {
          if (!price_category) return defaultFilter
          return wine => wine.price / 100 >= 50
        }
      }
      default:
        return defaultFilter
    }
  })
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
      // ascending
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
    filters: state.winesVisibilityFilter
  }
}

const mapDispatch = dispatch => {
  return {
    getWines: () => dispatch(getWines())
  }
}

export default connect(mapState, mapDispatch)(WinesList)
