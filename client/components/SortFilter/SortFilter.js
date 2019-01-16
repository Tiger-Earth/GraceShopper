import React, {Component} from 'react'
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

import store, {setFilters} from '../../store'

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
    // here I tried to simulate React.useState
    this.state = {
      filters: {
        checkedRed: false,
        checkedWhite: false,
        checkedRose: false,
        price: null, // low, mid, high
        sortBy: null // lowToHigh, highToLow
      },
      expanded: 'panel1'
    }
  }

  handleChange = name => (event, isExpanded) => {
    const state = this.state
    if (name.startsWith('panel')) {
      this.setState({
        ...state,
        expanded: isExpanded ? name : false
      })
    } else if (name.startsWith('checked')) {
      const newState = {
        ...state,
        filters: {
          ...state.filters,
          [name]: event.target.checked
        }
      }
      store.dispatch(setFilters(newState.filters))
      this.setState(newState)
    } else {
      const newState = {
        ...state,
        filters: {
          ...state.filters,
          [name]: event.target.value
        }
      }
      store.dispatch(setFilters(newState.filters))
      this.setState(newState)
    }
  }

  //const handle
  render() {
    const {classes} = this.props
    const handleChange = this.handleChange
    const {filters, expanded} = this.state
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
              {filters.sortBy}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <RadioGroup
              aria-label="sortBy"
              name="sortBy"
              className={classes.group}
              value={filters.sortBy}
              onChange={handleChange('sortBy')}
            >
              {[
                {id: 1, value: 'low to high', label: 'Price: Low to High'},
                {id: 2, value: 'high to low', label: 'Price: High to Low'}
              ].map(({id, value, label}) => (
                <FormControlLabel
                  key={id}
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
              {filters.checkedRed && 'red'} {filters.checkedWhite && 'white'}{' '}
              {filters.checkedRose && 'rose'}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormGroup>
              {[
                {id: 1, color: 'Red'},
                {id: 2, color: 'White'},
                {id: 3, color: 'Rose'}
              ].map(({id, color}) => (
                <FormControlLabel
                  key={id}
                  control={
                    <Checkbox
                      checked={filters[`checked${color}`]}
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
              {filters.price}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <RadioGroup
              aria-label="Price"
              name="price"
              value={filters.price}
              onChange={handleChange('price')}
            >
              {[
                {id: 1, value: 'low', label: 'Less than $25'},
                {id: 2, value: 'mid', label: '$25-$50'},
                {id: 3, value: 'high', label: 'More than $50'}
              ].map(({id, value, label}) => (
                <FormControlLabel
                  key={id}
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
