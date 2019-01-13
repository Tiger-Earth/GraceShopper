import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {white, grey} from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'

import {Elements, StripeProvider} from 'react-stripe-elements'
import Grid from '@material-ui/core/Grid'

// establishes socket connection

import './socket'

const theme = createMuiTheme({
  palette: {
    primary: white,
    secondary: grey
  },
  typography: {
    useNextVariants: true
  }
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <StripeProvider apiKey="pk_test_1d7rhiLcfWHAoIbxcKI7dGRQ">
        <Router history={history}>
          <Elements>
            <CssBaseline>
              <Grid>
                <App />
              </Grid>
            </CssBaseline>
          </Elements>
        </Router>
      </StripeProvider>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
)
