import axios from 'axios'
import user from './user'

// Rhianna and McRae worked on this for 15000 hours with Jan

/**
 * INITIAL STATE
 */

// retrieve initial state from localStorage or supply empty object if nothing stored in localStorage

const initialCart = localStorage.getItem('reduxCart')
  ? JSON.parse(localStorage.getItem('reduxCart'))
  : {}

/**
 * ACTION TYPES
 */

// add to cart, NOT LOGGED IN
const ADD_TO_CART = 'ADD_TO_CART'

// TODO add to cart, LOGGING IN!

const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'

/**
 * ACTION CREATORS
 */
export const addToCart = (id, quantity) => {
  return {
    type: ADD_TO_CART,
    id,
    quantity
  }
}

export const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}

/**
 * THUNK CREATORS
 */
export const pushToCart = (wineId, quantity) => async dispatch => {
  try {
    if (user) {
      await axios.post(`/api/cart/${wineId}`, {quantity})
    }
    dispatch(addToCart(wineId, quantity))
  } catch (err) {
    console.error(err)
  }
}

export const fetchCart = () => async dispatch => {
  try {
    if (user) {
      const {data} = await axios.get(`/api/cart`)
      dispatch(getCart(data))
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialCart, action) {
  switch (action.type) {
    // add to cart NOT logged in
    case GET_CART: {
      return action.cart
    }
    case ADD_TO_CART: {
      const id = action.id
      const quantity = +action.quantity
      const copy = {...state}
      if (copy[id]) {
        copy[id] += quantity
      } else {
        copy[id] = quantity
      }
      return copy
    }
    case CLEAR_CART: {
      return {}
    }
    default:
      return state
  }
}
