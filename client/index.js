import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import {Elements, StripeProvider} from 'react-stripe-elements'

// establishes socket connection

import './socket'

// defined customer theme for MUI

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#f0ebf7',
      main: '#ffffff',
      dark: '#a5a1ac',
      contrastText: '#a359b0'
    },
    secondary: {
      light: '#ee99fc',
      main: '#ea80fc',
      dark: '#a359b0',
      contrastText: '#ffffff'
    }
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
              <App />
            </CssBaseline>
          </Elements>
        </Router>
      </StripeProvider>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
)
