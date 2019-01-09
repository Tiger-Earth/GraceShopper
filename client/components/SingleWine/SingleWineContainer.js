import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchWine} from '../../store'
import SingleWine from './SingleWine'

export class SingleWineContainer extends Component {
  componentDidMount() {
    const id = this.props.match.params.wineId
    this.props.fetchWine(id)
  }
  render() {
    return <SingleWine wine={this.props.wine} />
  }
}

const mapStateToProps = state => ({
  wine: state.selectedWine
})

const mapDispatchToProps = dispatch => ({
  fetchWine: id => dispatch(fetchWine(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleWineContainer)
