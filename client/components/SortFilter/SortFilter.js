import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import FormGroup from '@material-ui/core/FormGroup'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
})

class FilterAccordionMenu extends Component {
  constructor() {
    super()
    this.state = {
      state: {
        checkedRed: false,
        checkedWhite: false,
        price: null, // low, mid, high
        sortBy: null // lowToHigh, highToLow
      },
      expanded: 'panel1'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = name => (event, isExpanded) => {
    const state = this.state
    if (name.startsWith('panel')) {
      this.setState({
        ...state,
        expanded: isExpanded ? name : false
      })
    } else if (name.startsWith('checked')) {
      this.setState({
        ...state,
        state: {
          ...state.state,
          [name]: event.target.checked
        }
      })
    } else {
      this.setState({
        ...state,
        state: {
          ...state.state,
          [name]: event.target.value
        }
      })
    }
  }

  //const handle
  render() {
    const {classes} = this.props
    const handleChange = this.handleChange
    const {state, expanded} = this.state
    return (
      <div className={classes.root}>
        <Typography variant="h5">Filter + Sort</Typography>
        <ExpansionPanel
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Sort By</Typography>
            <Typography className={classes.secondaryHeading}>
              {state.sortBy}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <RadioGroup
              aria-label="sortBy"
              name="sortBy"
              className={classes.group}
              value={state.sortBy}
              onChange={handleChange('sortBy')}
            >
              {[
                {value: 'low to high', label: 'Price: Low to High'},
                {value: 'high to low', label: 'Price: High to Low'}
              ].map(({value, label}) => (
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Color</Typography>
            <Typography className={classes.secondaryHeading}>
              {state.checkedRed && 'red'} {state.checkedWhite && 'white'}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormGroup>
              {['Red', 'White'].map(color => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state[`checked${color}`]}
                      onChange={handleChange(`checked${color}`)}
                    />
                  }
                  label={color}
                />
              ))}
            </FormGroup>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Price</Typography>
            <Typography className={classes.secondaryHeading}>
              {state.price}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <RadioGroup
              aria-label="Price"
              name="price"
              value={state.price}
              onChange={handleChange('price')}
            >
              {[
                {value: 'low', label: 'Less than $25'},
                {value: 'mid', label: '$25-$50'},
                {value: 'high', label: 'More than $50'}
              ].map(({value, label}) => (
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}
export default withStyles(useStyles)(FilterAccordionMenu)
