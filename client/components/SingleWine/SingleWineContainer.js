import React, {Component} from 'react'
import {connect} from 'react-redux'
import NProgress from 'nprogress'
import {fetchWine, addToCart} from '../../store'
import SingleWine from './SingleWine'

export class SingleWineContainer extends Component {
  constructor() {
    super()
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler() {
    NProgress.start()
    this.props.addToCart(this.props.match.params.wineId)
    NProgress.done()
  }
  componentDidMount() {
    const id = this.props.match.params.wineId
    this.props.fetchWine(id)
  }
  render() {
    return (
      <SingleWine wine={this.props.wine} clickHandler={this.clickHandler} />
    )
  }
}

const mapStateToProps = state => ({
  wine: state.selectedWine
})

const mapDispatchToProps = dispatch => ({
  fetchWine: id => dispatch(fetchWine(id)),
  pushToCart: id => dispatch(pushToCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleWineContainer)
