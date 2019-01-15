import axios from 'axios'
import {fetchCart, getCart} from './index'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE
 */
const defaultUser = {
  orders: []
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getOrders = orders => ({type: GET_ORDERS, payload: orders})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async (dispatch, getState) => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    console.error(authError)
  }

  try {
    dispatch(getUser(res.data))

    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const updateDatabaseCart = () => async (dispatch, getState) => {
  try {
    if (!localStorage.getItem('reduxCart')) return
    await Promise.all(
      Object.keys(getState().cart).map(wineId =>
        axios.post(`/api/cart/${wineId}`, {
          quantity: +getState().cart[wineId]
        })
      )
    )
    localStorage.removeItem('reduxCart')
    // get cart from database and update store's cart
    dispatch(fetchCart())
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    localStorage.removeItem('reduxCart')
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/')
    dispatch(getCart({}))
  } catch (err) {
    console.error(err)
  }
}

export const fetchOrders = () => async dispatch => {
  try {
    const response = await axios.get('/api/orders')
    dispatch(getOrders(response.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case GET_ORDERS: {
      const copy = {...state}
      copy.orders = action.payload
      return copy
    }
    default:
      return state
  }
}
