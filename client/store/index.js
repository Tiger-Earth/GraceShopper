import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import selectedWine from './wine'
import allWines from './allWines'
import cart from './cart'
import address from './address'
// import createLogger from 'redux-logger'

const reducer = combineReducers({user, allWines, selectedWine, cart, address})
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(reducer, middleware)

// store cart in localStorage to retrieve after refresh!
store.subscribe(() => {
  if (Object.keys(store.getState().user).length === 0) {
    localStorage.setItem('reduxCart', JSON.stringify(store.getState().cart))
  }
})

export default store
export * from './user'
export * from './allWines'
export * from './wine'
export * from './cart'
export * from './address'
