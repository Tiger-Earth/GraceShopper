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
import Grid from '@material-ui/core/Grid'

const useStyles = theme => ({
  root: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing.unit * 3
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
      const panel = name
      this.setState({
        ...state,
        expanded: isExpanded ? panel : false
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
        <Typography variant="h3">Filter + Sort</Typography>
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
              <FormControlLabel
                value="low to high"
                control={<Radio />}
                label="Price: Low to High"
              />
              <FormControlLabel
                value="high to low"
                control={<Radio />}
                label="Price: High to Low"
              />
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedRed}
                    onChange={handleChange('checkedRed')}
                  />
                }
                label="Red"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedWhite}
                    onChange={handleChange('checkedWhite')}
                  />
                }
                label="White"
              />
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
              className={classes.group}
              value={state.price}
              onChange={handleChange('price')}
            >
              <FormControlLabel
                value="low"
                control={<Radio />}
                label="Less than $25"
              />
              <FormControlLabel
                value="mid"
                control={<Radio />}
                label="$25-$50"
              />
              <FormControlLabel
                value="high"
                control={<Radio />}
                label="More than $50"
              />
            </RadioGroup>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

const AccordionMenu = withStyles(useStyles)(FilterAccordionMenu)

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

function CenteredGrid(props) {
  const {classes, id} = props
  window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

  return (
    <div id={id} className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={2}>
          <AccordionMenu />
        </Grid>
        <Grid item xs={10}>
          {props.children}
        </Grid>
      </Grid>
    </div>
  )
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CenteredGrid)
