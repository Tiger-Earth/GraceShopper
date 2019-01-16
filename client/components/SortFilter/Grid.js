import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AccordionMenu from './SortFilter'

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
        <Grid item xs={3}>
          <AccordionMenu />
        </Grid>
        <Grid item xs={9}>
          {props.children}
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(CenteredGrid)
