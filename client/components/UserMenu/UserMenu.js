import React, {Component} from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import PersonIcon from '@material-ui/icons/Person'
import history from '../../history'
import {logout} from '../../store'
import {connect} from 'react-redux'

class UserMenu extends Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {anchorEl} = this.state
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <PersonIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            onClick={() => {
              history.push('/account')
              this.handleClose()
            }}
          >
            Account Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push('/order-history')
              this.handleClose()
            }}
          >
            Order History
          </MenuItem>
          <MenuItem onClick={this.props.logout}>
            <i className="fas fa-sign-out-alt" />&#160;&#160;Logout
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(UserMenu)
