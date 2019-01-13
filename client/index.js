import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {indigo, blue} from '@material-ui/core/colors'

import {Elements, StripeProvider} from 'react-stripe-elements'

// establishes socket connection

import './socket'

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: blue
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
            <App />
          </Elements>
        </Router>
      </StripeProvider>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
)
